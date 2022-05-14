import React from 'react';
import DialogCardComponent from "../../DialogsComponents/DialogCardComponent/DialogCardComponent";
import s from './activeDialogsPage.module.scss'
import {Button} from "reactstrap";
import {dataBase} from "../../../../firebase";
import {set, ref, push} from "firebase/database";
import {useSelector} from "react-redux";

const ActiveDialogsPage = () => {
    const {data} = useSelector((state) => state)
    const {dialogs} = useSelector(state => state.data)

    return (
        <>
            <div className={s.title}>
                ActiveDialogsPage
            </div>
            <div className={s.dialogsCards}>
                {dialogs ?
                    Object.values(dialogs).map((item, index) => (
                        <div className={s.card}>
                            <DialogCardComponent/>
                        </div>
                    ))
                    :
                    null
                }
            </div>
        </>
    );
};

export default ActiveDialogsPage;