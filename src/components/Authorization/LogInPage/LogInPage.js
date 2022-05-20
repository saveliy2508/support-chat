import React from 'react';

import s from '../AuthorisationStyles.module.scss';

import {useFormik} from 'formik';
import * as yup from 'yup';
import {Link} from "react-router-dom";
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle, faVk} from "@fortawesome/free-brands-svg-icons";
import {toast} from "react-toastify";

import Form from './../AuthorizationComponents/Form/Form';
import SubmitButton from "./../AuthorizationComponents/SubmitButton/SubmitButton";
import Input from "../AuthorizationComponents/Input/Input";

const LogInPage = ({loginFunction}) => {
    const notify = () => toast.info('Ошибка входа', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const handleLogin = (email, password) => {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then((responce) => {
                loginFunction(responce)
            })
            .catch(() => notify())
    }

    const provider = new GoogleAuthProvider();
    const handleRegisterWithGoogle = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((responce) => {
                loginFunction(responce)
            })
            .catch(() => notify())
    }

    const formik = useFormik({
            initialValues: {
                email: '',
                password: ''
            },
            validationSchema: yup.object({
                email: yup.string().email('Неверный формат').required('Обязательное поле'),
                password: yup.string().required('Введите пароль')
            }),
            onSubmit: (values) => {
                handleLogin(values.email, values.password)
            }
        }
    )
    return (
        <div className={s.authorizationFormContainer}>
            <div className={s.authorizationForm}>
                <Form formTitle='Войти в Rocket support'/>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">Почта</label>
                    <Input
                        type='text'
                        name='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    <p className={s.error}>{formik.errors.email && formik.touched.email ? formik.errors.email : null}</p>
                    <label htmlFor="password">Пароль</label>
                    <Input
                        type="password"
                        name='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    <p className={s.error}>{formik.errors.password && formik.touched.password ? formik.errors.password : null}</p>
                    <div className={s.footer}>
                        <p className={s.isAccount}>Нет аккаунта? <br/><Link
                            to='/authorization/registration'>Регистрация</Link></p>
                        <p className={s.isAccount}>Забыли пароль? <br/><Link
                            to='/authorization/forgetPassword'>Восстановить</Link></p>
                    </div>
                    <div className={s.registrationWith}>
                        <div>Войти через <br/>
                            <FontAwesomeIcon className={s.vkIcon} icon={faVk}/><br/>(не работает)</div>
                        <div onClick={handleRegisterWithGoogle}>Войти через <br/>
                            <FontAwesomeIcon className={s.googleIcon} icon={faGoogle}/></div>
                    </div>
                    <SubmitButton text='Войти' handleClick={handleLogin}/>
                </form>
            </div>
        </div>
    );
};

export default LogInPage;