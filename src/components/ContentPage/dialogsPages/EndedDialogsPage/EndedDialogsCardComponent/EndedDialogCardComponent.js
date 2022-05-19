import React from 'react';

import s from "./endedDialogCardComponent.module.scss";

import {Button} from "reactstrap";

const EndedDialogCardComponent = ({
                                       clientName,
                                       startTime,
                                       dialogData,
                                       handleContinue,
                                       messages,
                                       handleSaveDialog,
                                   }) => {
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
                        onClick={() => handleContinue(dialogData.dialogId)}>Читать</Button>
                <p>{`Начат ${new Date(startTime).getDate()}.${new Date(startTime).getMonth()}.${new Date(startTime).getFullYear()} в ${new Date(startTime).getHours()}:${new Date(startTime).getMinutes()}`}</p>
                <Button color='primary' block
                        onClick={() => handleSaveDialog(dialogData.dialogId)}
                >Сохранить диалог</Button>
            </div>
        </div>
    );
};

export default EndedDialogCardComponent;
