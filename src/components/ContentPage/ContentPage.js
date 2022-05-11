import React from 'react';
import NewDialogsPage from "./dialogsPages/NewDialogsPage/NewDialogsPage";
import HeaderContentPage from "./HeaderContentPage/HeaderContentPage";
import s from './contentPage.module.scss'

const ContentPage = () => {
    return (
        <div className={s.contentWrapper}>
            <HeaderContentPage/>
            <NewDialogsPage/>
        </div>
    );
};

export default ContentPage;
