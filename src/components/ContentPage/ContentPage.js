import React from 'react';
import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {equalTo, off, onValue, orderByChild, query, ref, set} from "firebase/database";
import {dataBase} from "../../firebase";
import ReactModal from "react-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

import s from './contentPage.module.scss'

import HeaderContentPage from "./HeaderContentPage/HeaderContentPage";
import NavbarContentPage from "./NavbarContentPage/NavbarContentPage";
import ActiveDialogsPage from "./dialogsPages/ActiveDialogsPage/ActiveDialogsPage";
import NewDialogsPage from "./dialogsPages/NewDialogsPage/NewDialogsPage";
import SavedDialogsPage from "./dialogsPages/SavedDialogsPage/SavedDialogsPage";
import EndedDialogsPage from "./dialogsPages/EndedDialogsPage/EndedDialogsPage";
import ChatWindow from "./DialogsComponents/ChatWindow/ChatWindow";

import {setSavedDialogs, setStartedActiveDialogsId} from "../../redux/actions/userActions";
import {setActiveDialogs, setNewDialogs} from "../../redux/actions/dataActions";

ReactModal.setAppElement('#root')

const ContentPage = () => {
    const {currentDialog, id} = useSelector(state => state.user);

    const dispatch = useDispatch();

    React.useEffect(() => {
        return () => {

            const savedDialogsRef = ref(dataBase, `users/${id}/savedDialogsId`);
            onValue(savedDialogsRef, (snapshot) => {
                let user = snapshot.val();
                dispatch(setSavedDialogs(user))
            });

            const newDialogsRef = ref(dataBase, `newDialogs`);
            onValue(newDialogsRef, (snapshot) => {
                let dialogs = [];
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val()
                    dialogs.push(data)
                })
                dispatch(setNewDialogs(dialogs))
            });

            const activeDialogsRef = query(ref(dataBase, 'activeDialogs'), orderByChild('operatorId'), equalTo(id))
            onValue(activeDialogsRef, (snapshot) => {
                let dialogs = [];
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val()
                    dialogs.push(data)
                })
                dispatch(setActiveDialogs(dialogs))
            });

            const startedActiveDialogsIdRef = ref(dataBase, `users/${id}/startedActiveDialogsId`);
            onValue(startedActiveDialogsIdRef, (snapshot) => {
                let dialogs = snapshot.val();
                dispatch(setStartedActiveDialogsId(dialogs))
            });

            return function () {
                off(savedDialogsRef)
                off(newDialogsRef)
                off(activeDialogsRef)
                off(startedActiveDialogsIdRef)
            }
        };
    }, []);

    const addDialogToEnded = (dialogId, grade) => {
        const addToEndDialogRef = ref(dataBase, `activeDialogs/${dialogId}/ended`);
        set(addToEndDialogRef, true);
        const addGradeRef = ref(dataBase, `activeDialogs/${dialogId}/grade`);
        set(addGradeRef, grade);
    }

    // React Modal
    const [isOpenModal, setIsOpenModal] = React.useState(false);


    return (
        <>
            <ReactModal
                isOpen={isOpenModal}
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => setIsOpenModal(false)}
                style={
                    {
                        content: {
                            maxWidth: '1024px',
                            margin: '-10px auto 0 auto',
                        }
                    }
                }
            >
                <div className={s.modal}>
                    <div className={s.modalHeader}>
                        <div className={s.title}>
                            Настройки
                        </div>
                        <div className={s.xmark}>
                            <FontAwesomeIcon icon={faXmark} onClick={() => setIsOpenModal(false)}/>
                        </div>
                    </div>
                </div>
            </ReactModal>
            <div className={s.contentWrapper}>
                <HeaderContentPage setIsOpenModal={setIsOpenModal}/>
                <div className={s.content}>
                    <div className={s.navBar}>
                        <NavbarContentPage/>
                    </div>
                    <div className={s.dialogs}>
                        <Routes>
                            <Route path='newDialogs' element={<NewDialogsPage/>}/>
                            <Route path='activeDialogs'
                                   element={<ActiveDialogsPage addDialogToEnded={addDialogToEnded}/>}/>
                            <Route path='savedDialogs' element={<SavedDialogsPage/>}/>
                            <Route path='endedDialogs' element={<EndedDialogsPage/>}/>
                            <Route path={currentDialog} element={<ChatWindow/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContentPage;
