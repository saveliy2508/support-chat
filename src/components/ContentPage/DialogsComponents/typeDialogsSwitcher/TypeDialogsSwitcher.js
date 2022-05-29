import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "reactstrap";

import s from "./typeDialogsSwitcher.module.scss";

const TypeDialogsSwitcher = ({path, title, counter, text}) => {
    return (
        <div className={s.dialogsSwitcher}>
            <Link to={`/contentPage${path}`}>
                <Button color='primary' block className={s.title}>
                    {title}
                </Button>
            </Link>
            {counter !== -1 &&
                <div className={s.dialogsCounter}>
                    <p className={s.counter}>{counter}</p>
                    <p className={s.text}>{text}</p>
                </div>}
        </div>
    );
};

export default TypeDialogsSwitcher;
