import s from "./form.module.scss";
import React from "react";

const Form = (props) => {
    return (
        <>
            <div className={s.headerForm}>
                <img className={s.img} src="./img/logo.png" alt="Логотип"/>
                <div className={s.text}>{props.formTitle}</div>
            </div>
        </>
    );
};

export default Form;
