import React from 'react';
import HeaderContentPage from "./HeaderContentPage/HeaderContentPage";
import s from './contentPage.module.scss'
import NavbarContentPage from "./NavbarContentPage/NavbarContentPage";

const ContentPage = () => {
    return (
        <div className={s.contentWrapper}>
            <HeaderContentPage/>
            <div className={s.content}>
                <div className={s.navBar}>
                    <NavbarContentPage />
                </div>
                <div className={s.dialogs}>
                    dialogs
                </div>
                <div className={s.clientInformation}>
                    {/*info*/}
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
