import React from 'react';
import s from './input.module.scss'
import {Input} from "reactstrap";

const authInput = ({type, name, onChange, onBlur, value}) => {
    return (
        <Input
            className={s.input}
            type={type}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            bsSize=""
        />
    );
};

export default authInput;
