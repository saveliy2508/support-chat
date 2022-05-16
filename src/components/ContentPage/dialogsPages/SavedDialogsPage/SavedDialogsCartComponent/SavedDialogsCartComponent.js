import React from 'react';
import s from "./savedDialogsCartComponent.module.scss";
import {Button} from "reactstrap";

const SavedDialogCardComponent = ({clientName, dialogData, handleContinue, messages}) => {
    return (
        <div className={s.dialogCard}>
            <div className={s.clientInfo}>
                {clientName}
            </div>
            <div className={s.lastMessage}>
                {Object.values(messages)[Object.values(messages).length - 1].text}
            </div>
            <div className={s.dialogInfo}>
                <Button color='primary' block className={s.continueButton} onClick={() => handleContinue(dialogData.dialogId)}>Продолжить</Button>
                <Button color='primary' block>Сохранить диалог</Button>
            </div>
        </div>
    );
};

export default SavedDialogCardComponent;
