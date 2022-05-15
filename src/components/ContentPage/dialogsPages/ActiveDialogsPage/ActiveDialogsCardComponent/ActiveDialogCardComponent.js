import React from 'react';
import s from "./activeDialogCardComponent.module.scss";
import {Button} from "reactstrap";

const ActiveDialogCardComponent = ({clientName, startTime, dialogData, handleContinue, messages}) => {
    return (
        <div className={s.dialogCard}>
            <div className={s.clientInfo}>
                {clientName}
            </div>
            <div className={s.lastMessage}>
                {Object.values(messages)[Object.values(messages).length - 1].text}
            </div>
            <div className={s.dialogInfo}>
                <Button color='primary' block
                        onClick={() => handleContinue(dialogData.dialogId)}>Продолжить</Button>
                <p>{`Начат ${new Date(startTime).getDate()}.${new Date(startTime).getMonth()}.${new Date(startTime).getFullYear()} в ${new Date(startTime).getHours()}:${new Date(startTime).getMinutes()}`}</p>
                <Button color='primary' block>Сохранить диалог</Button>
            </div>
        </div>
    );
};

export default ActiveDialogCardComponent;
