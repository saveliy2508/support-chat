import React from 'react';
import DialogCardComponent from "./ActiveDialogsCardComponent/ActiveDialogCardComponent";
import s from './activeDialogsPage.module.scss'
import {useSelector} from "react-redux";

const ActiveDialogsPage = () => {
    const {activeDialogs} = useSelector(state => state.data)
    return (
        <>
            <div className={s.title}>
                ActiveDialogsPage
            </div>
            <div className={s.dialogsCards}>
                {activeDialogs ?
                    Object.values(activeDialogs).map((item, index) => (
                        <div className={s.card}>
                            <DialogCardComponent
                                clientName={item.clientName}
                                startTime={item.startTime}
                                dialogData={item}
                                messages={item.messages}
                            />
                        </div>
                    ))
                    : null
                }
            </div>
        </>
    );
};

export default ActiveDialogsPage;