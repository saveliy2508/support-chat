import React from 'react';
import {Button} from "reactstrap";
import s from './submitButton.module.scss'

const SubmitButton = (props) => {
    return (
            <Button
                onClick={props.handleClick}
                className={s.button}
                block
                color="primary"
                size="lg"
                type='submit'
            >
                {props.text}
            </Button>
    );
};

export default SubmitButton;
