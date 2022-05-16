import React from 'react';
import DialogCardComponent from "./ActiveDialogsCardComponent/ActiveDialogCardComponent";
import s from './activeDialogsPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDialog} from "../../../../redux/actions/userActions";
import {useNavigate} from "react-router-dom";
import {push, ref, set} from "firebase/database";
import {dataBase} from "../../../../firebase";

const ActiveDialogsPage = () => {
    const {activeDialogs} = useSelector(state => state.data)
    const {id} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleContinue = (dialogId) => {
        dispatch(setCurrentDialog(dialogId))
        navigate(`/contentPage/${dialogId}`)
    }

    const handleSaveDialog = (dialogId) => {
        const saveDialogRef = ref(dataBase, `users/${id}/savedDialogsId/${dialogId}`);
        set(saveDialogRef, {
            dialogId
        });
    }

    return (
        <>
            <div className={s.title}>
                ActiveDialogsPage
            </div>
            <div className={s.dialogsCards}>
                {activeDialogs ?
                    Object.values(activeDialogs).map((item, index) => (
                        <div className={s.card} key={'activeDialogs' + index}>
                            <DialogCardComponent
                                clientName={item.clientName}
                                startTime={item.startTime}
                                dialogData={item}
                                messages={item.messages}
                                handleContinue={handleContinue}
                                handleSaveDialog={handleSaveDialog}
                            />
                        </div>
                    ))
                    : null
                }
            </div>
        </>
    );
};

export default ActiveDialogsPage;