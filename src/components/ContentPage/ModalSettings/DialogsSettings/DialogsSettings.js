import React from 'react';
import s from './dialogsSettings.module.scss'
import {Input} from "reactstrap";

const DialogsSettings = () => {
    return (
        <>
            <div className={s.greeding}>
                Автоматическое приветствие: <Input />
            </div>
            Готовые фразы:
            <div className={s.phrases}>

            </div>
            Добавить еще:
            <Input type="text"/>
            <button></button>
        </>
    );
};

export default DialogsSettings;
