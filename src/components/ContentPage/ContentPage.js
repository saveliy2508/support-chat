import React from 'react';
import HeaderContentPage from "./HeaderContentPage/HeaderContentPage";
import s from './contentPage.module.scss'
import NavbarContentPage from "./NavbarContentPage/NavbarContentPage";
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import ActiveDialogsPage from "./dialogsPages/ActiveDialogsPage/ActiveDialogsPage";
import NewDialogsPage from "./dialogsPages/NewDialogsPage/NewDialogsPage";

const ContentPage = () => {
    const {email} = useSelector(state => state.user)

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
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
