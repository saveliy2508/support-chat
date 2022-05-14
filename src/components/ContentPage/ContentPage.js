import React from 'react';
import HeaderContentPage from "./HeaderContentPage/HeaderContentPage";
import s from './contentPage.module.scss'
import NavbarContentPage from "./NavbarContentPage/NavbarContentPage";
import {Route, Routes} from "react-router-dom";
import ActiveDialogsPage from "./dialogsPages/ActiveDialogsPage/ActiveDialogsPage";
import NewDialogsPage from "./dialogsPages/NewDialogsPage/NewDialogsPage";
import SavedDialogsPage from "./dialogsPages/SavedDialogsPage/SavedDialogsPage";
import EndedDialogsPage from "./dialogsPages/EndedDialogsPage/EndedDialogsPage";

const ContentPage = () => {
    return (
        <div className={s.contentWrapper}>
            <HeaderContentPage/>
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
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
