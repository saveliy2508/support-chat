import React from 'react';
import s from './navbarContentPage.module.scss'

const NavbarContentPage = () => {
    return (
        <div className={s.navbarWrapper}>
            <div className={s.dialogsSwitcher}>
                newDialogsSwitcher
            </div>
            <div className={s.dialogsSwitcher}>
                activeDialogsSwitcher
            </div>
            <div className={s.dialogsSwitcher}>
                savedDialogsSwitcher
            </div>
            <div className={s.dialogsSwitcher}>
                endedDialogsSwitcher
            </div>
        </div>
    );
};

export default NavbarContentPage;
