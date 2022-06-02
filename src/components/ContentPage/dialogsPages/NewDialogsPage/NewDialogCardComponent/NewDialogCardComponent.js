import React from 'react';
import {Button} from "reactstrap";
import moment from "moment";
import 'moment/locale/ru'

import s from "./newDialogCardComponent.module.scss";


const NewDialogCardComponent = ({clientName, startTime, dialogData, handleAddToActiveDialogs, messages}) => {
    const startMoment = moment(startTime).locale('ru').fromNow();
    return (
        <div className={s.dialogCard}>
            <div className={s.clientInfo}>
                {clientName}
            </div>
            <div className={s.lastMessage}>
                <div>
                    {messages && Object.values(messages)[Object.values(messages).length - 1].text}
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
