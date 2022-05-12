import React from 'react';
import s from './input.module.scss'
import {Input} from "reactstrap";

const authInput = (props) => {
    return (
        <Input
            className={s.input}
            type={props.type}
            name={props.name}
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
            bsSize=""
        />
    );
};

export default authInput;
