import React from 'react';
import {Button} from "reactstrap";

import s from "./newDialogCardComponent.module.scss";
import moment from "moment";


const NewDialogCardComponent = ({clientName, startTime, dialogData, handleAddToActiveDialogs, messages}) => {
    const startMoment = moment(startTime).locale('ru').fromNow();
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
                    Начат {startMoment}
                </p>
            </div>
        </div>
    );
};

export default NewDialogCardComponent;
