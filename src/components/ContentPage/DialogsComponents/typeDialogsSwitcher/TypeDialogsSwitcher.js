import React from 'react';
import s from "./typeDialogsSwitcher.module.scss";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

const TypeDialogsSwitcher = ({path, title, counter, text}) => {
    return (
        <div className={s.dialogsSwitcher}>
            <Link to={`/contentPage${path}`}>
                <Button color='primary' block className={s.title}>
                    {title}
                </Button>
            </Link>
            <div className={s.dialogsCounter}>
                <p className={s.counter}>{counter}</p>
                <p className={s.text}>{text}</p>
            </div>
        </div>
    );
};

export default TypeDialogsSwitcher;
