import React from 'react';
import s from './navbarContentPage.module.scss'
import TypeDialogsSwitcher from "../DialogsComponents/typeDialogsSwitcher/TypeDialogsSwitcher";

const NavbarContentPage = () => {
    return (
        <div className={s.navbarWrapper}>
            <TypeDialogsSwitcher path={'/newDialogs'} title='Новые диалоги' counter={1} text='клиентов ожидают очереди'/>
            <TypeDialogsSwitcher path={'/activeDialogs'} title='Активные диалоги' counter={1} text='клиентов ожидают ответа'/>
            <TypeDialogsSwitcher path={'/endedDialogs'} title='Завершенные диалоги' counter={1} />
            <TypeDialogsSwitcher path={'/savedDialogs'} title='Сохраненные диалоги' counter={1} />
        </div>
    );
};

export default NavbarContentPage;
