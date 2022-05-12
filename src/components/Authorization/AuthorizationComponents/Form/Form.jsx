import s from "./form.module.scss";
import React from "react";

const Form = ({formTitle}) => {
    return (
        <>
            <div className={s.headerForm}>
                <div className={s.imgWrapper}>
                    <img className={s.img}
                          src='https://firebasestorage.googleapis.com/v0/b/test-project-24972.appspot.com/o/logo.png?alt=media&token=bcba4928-88d5-4b26-a7fa-7826b88d6ae6'
                          alt="Логотип"
                />
                </div>
                <div className={s.text}>{formTitle}</div>
            </div>
        </>
    );
};

export default Form;