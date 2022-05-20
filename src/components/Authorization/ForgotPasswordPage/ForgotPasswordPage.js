import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../../../firebase";
import {sendPasswordResetEmail} from 'firebase/auth'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from "../AuthorisationStyles.module.scss";

import Form from './../AuthorizationComponents/Form/Form'
import SubmitButton from "./../AuthorizationComponents/SubmitButton/SubmitButton";
import Input from "../AuthorizationComponents/Input/Input";

const ForgetPassword = () => {
    const notify = (text) => toast.info(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const navigate = useNavigate()

    const [emailInput, setEmailInput] = React.useState('');

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    const handleResetPassword = async () => {
        await sendPasswordResetEmail(auth, emailInput)
            .then(() => {
                notify('Проверьте вашу почту')
            }).catch(() => notify('Ошибка'))
        await delay(6000)
        navigate('/authorization/login')
    }

    return (
        <div className={s.authorizationFormContainer}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={s.authorizationForm}>
                <Form formTitle='Восстановление пароля'/>
                <div className={s.form}>
                    <label htmlFor="email">Почта</label>
                    <Input
                        type="text"
                        name='email'
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)}
                    />
                    <SubmitButton handleClick={handleResetPassword} text='Отправить ссылку'/>
                </div>
                <div className={s.directions}>
                    <Link to='/authorization/login'>Войти</Link>
                    <Link to='/authorization/registration'>Регистрация</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
