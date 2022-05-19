import React from 'react';
import {Button} from "reactstrap";

import s from "./newDialogCardComponent.module.scss";


const NewDialogCardComponent = ({clientName, startTime, dialogData, handleAddToActiveDialogs, messages}) => {
    // console.log(Object.values(messages)[0])
    return (
        <div className={s.dialogCard}>
            <div className={s.clientInfo}>
                {clientName}
            </div>
            <div className={s.lastMessage}>
                <div>
                    {Object.values(messages)[Object.values(messages).length - 1].text}
                </div>
            </div>
            <div className={s.dialogInfo}>
                <Button
                    color='primary' block
                    onClick={() => handleAddToActiveDialogs(clientName, dialogData.dialogId, startTime, messages)}>Начать</Button>
                <p>
                    {`Начат ${new Date(startTime).getDate()}.${new Date(startTime).getMonth()}.${new Date(startTime).getFullYear()} в ${new Date(startTime).getHours()}:${new Date(startTime).getMinutes()}`}
                </p>
            </div>
        </div>
    );
};

export default NewDialogCardComponent;
