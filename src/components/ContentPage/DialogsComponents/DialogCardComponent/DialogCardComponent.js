import React from 'react';
import s from "./DialogCardComponent.module.scss";

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
                <button>Продолжить</button>
                <p>12 дней назад</p>
                <button>Сохранить</button>
            </div>
        </div>
    );
};

export default DialogCardComponent;
