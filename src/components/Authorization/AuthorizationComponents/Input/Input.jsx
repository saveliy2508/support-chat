import React from 'react';
import {Input} from "reactstrap";

import s from './input.module.scss'

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
