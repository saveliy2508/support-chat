import React from 'react';
import s from "./DialogCardComponent.module.scss";
import {Button} from "reactstrap";

const DialogCardComponent = ({clientName, startTime, dialogData,handleAddToActiveDialogs}) => {
    return (
        <div className={s.dialogCard}>
            <div className={s.clientInfo}>
                {clientName}
            </div>
            <div className={s.lastMessage}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cum dolorem hic in maxime minus molestiae
                molestias neque nisi, nulla obcaecati porro!
            </div>
            <div className={s.dialogInfo}>
                <Button color='primary' block onClick={()=>handleAddToActiveDialogs(clientName, dialogData.dialogId, startTime)}>Продолжить</Button>
                <p>{`Начат ${new Date(startTime).getDate()}.${new Date(startTime).getMonth()}.${new Date(startTime).getFullYear()} в ${new Date(startTime).getHours()}:${new Date(startTime).getMinutes()}`}</p>
                <Button color='primary' block>Сохранить</Button>
            </div>
        </div>
    );
};

export default DialogCardComponent;
