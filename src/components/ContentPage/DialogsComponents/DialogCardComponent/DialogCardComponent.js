import React from 'react';
import s from "./DialogCardComponent.module.scss";
import {Button} from "reactstrap";

const DialogCardComponent = () => {
    return (
        <div className={s.dialogCard}>
            <div className={s.clientInfo}>
                Ivanov Ivan
            </div>
            <div className={s.lastMessage}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cum dolorem hic in maxime minus molestiae molestias neque nisi, nulla obcaecati porro!
            </div>
            <div className={s.dialogInfo}>
                <Button color='primary' block>Продолжить</Button>
                <p>12 дней назад</p>
                <Button color='primary' block>Сохранить</Button>
            </div>
        </div>
    );
};

export default DialogCardComponent;
