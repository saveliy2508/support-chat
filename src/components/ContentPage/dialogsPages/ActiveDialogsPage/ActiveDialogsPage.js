import React from 'react';
import DialogCardComponent from "../../DialogsComponents/DialogCardComponent/DialogCardComponent";
import s from './activeDialogsPage.module.scss'

const ActiveDialogsPage = () => {
    const test = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    return (
        <>
            <div className={s.title}>
                ActiveDialogsPage
            </div>
            <div className={s.dialogsCards}>
                {test.map(item => (
                    <div className={s.card}>
                        <DialogCardComponent />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ActiveDialogsPage;
