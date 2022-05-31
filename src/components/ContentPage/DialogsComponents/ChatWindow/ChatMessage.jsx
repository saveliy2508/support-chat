import React from 'react';
import s from "./chatWindow.module.scss";

const MyComponent = ({text, senderName, timestamp, imgSrc}) => {
    const dateTimestamp = new Date(timestamp)

    return (
            <div className={s.message}>
                <div className={s.text}>
                    {text ? text :
                        <img className={s.messageImg} src={imgSrc} alt='Image Error'/>}
                </div>
                <div className={s.name}>
                    {senderName}
                </div>
                <div className={s.name}>
                    {`${dateTimestamp.getHours()}:${dateTimestamp.getMinutes()} ${dateTimestamp.getDate()}.${dateTimestamp.getMonth()}.${dateTimestamp.getFullYear()}`}
                </div>
            </div>
    );
};

export default MyComponent;
