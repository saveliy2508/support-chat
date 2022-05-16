import React from 'react';
import HeaderContentPage from "./HeaderContentPage/HeaderContentPage";
import s from './contentPage.module.scss'
import NavbarContentPage from "./NavbarContentPage/NavbarContentPage";
import {Route, Routes} from "react-router-dom";
import ActiveDialogsPage from "./dialogsPages/ActiveDialogsPage/ActiveDialogsPage";
import NewDialogsPage from "./dialogsPages/NewDialogsPage/NewDialogsPage";
import SavedDialogsPage from "./dialogsPages/SavedDialogsPage/SavedDialogsPage";
import EndedDialogsPage from "./dialogsPages/EndedDialogsPage/EndedDialogsPage";
import ChatWindow from "./DialogsComponents/ChatWindow/ChatWindow";
import {useDispatch, useSelector} from "react-redux";
import {off, onValue, ref} from "firebase/database";
import {dataBase} from "../../firebase";
import {setSavedDialogs} from "../../redux/actions/userActions";
import {setActiveDialogs, setNewDialogs} from "../../redux/actions/dataActions";

const ContentPage = ({handleOff}) => {
    const {currentDialog, id, email} = useSelector(state => state.user);
    const dispatch = useDispatch();
    return (
        <div className={s.contentWrapper}>
            <HeaderContentPage handleOff={handleOff}/>
            <div className={s.content}>
                <div className={s.navBar}>
                    <NavbarContentPage/>
                </div>
                <div className={s.dialogs}>
                    <Routes>
                        <Route path='newDialogs' element={<NewDialogsPage/>}/>
                        <Route path='activeDialogs' element={<ActiveDialogsPage/>}/>
                        <Route path='savedDialogs' element={<SavedDialogsPage/>}/>
                        <Route path='endedDialogs' element={<EndedDialogsPage/>}/>
                        <Route path={currentDialog} element={<ChatWindow/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
