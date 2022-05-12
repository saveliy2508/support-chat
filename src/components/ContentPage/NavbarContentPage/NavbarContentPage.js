import React from 'react';
import s from './navbarContentPage.module.scss'
import {Link} from "react-router-dom";

const NavbarContentPage = () => {
    return (
        <div className={s.navbarWrapper}>
            <div className={s.dialogsSwitcher}>
                <Link to='/contentPage/newDialogs'>
                    newDialogsSwitcher
                </Link>
            </div>
            <div className={s.dialogsSwitcher}>
                <Link to='/contentPage/activeDialogs'>
                    activeDialogsSwitcher
                </Link>
            </div>
            <div className={s.dialogsSwitcher}>
                <Link to='/contentPage/savedDialogs'>
                    savedDialogsSwitcher
                </Link>
            </div>
            <div className={s.dialogsSwitcher}>
                <Link to='/contentPage/endedDialogs'>
                    endedDialogsSwitcher
                </Link>
            </div>
        </div>
    );
};

export default NavbarContentPage;
