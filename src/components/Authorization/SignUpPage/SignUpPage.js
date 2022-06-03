import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup'
import {Link} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {faDoorOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVk, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

import s from '../AuthorisationStyles.module.scss'

import Form from './../AuthorizationComponents/Form/Form'
import SubmitButton from "./../AuthorizationComponents/SubmitButton/SubmitButton";
import Input from "../AuthorizationComponents/Input/Input";
import {useDispatch} from "react-redux";

const AuthorizationForm = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const notify = () => toast.info('Ошибка', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((responce) => {
                dispatch({type: 'LOGIN_SAGA', response: responce})
                navigate('/contentPage/')
            })
            .catch(() => notify())
    }


    const provider = new GoogleAuthProvider();
    const handleLoginWithGoogle = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((responce) => {
                dispatch({type: 'LOGIN_SAGA', response: responce})
                navigate('/contentPage/')
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
                password: yup.string()
                    .min(8, 'Слишком короткий пароль. Минимум 8 знаков')
                    .matches(/(?=,*[a-z])/, 'Минимум одна буква нижнего регистра')
                    .matches(/(?=,*[A-Z])/, 'Минимум одна буква верхнего регистра')
                    .matches(/(?=,*[0-9])/, 'Минимум одна цифра')
                    .required('Введите пароль')
            }),
            onSubmit: (values) => {
                handleRegister(values.email, values.password)
            }
        }
    )

    return (
        <div className={s.authorizationFormContainer}>
            <div className={s.authorizationForm}>
                <Form formTitle='Регистрация в Rocket support'/>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">Почта</label>
                    <Input
                        type="text"
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
                    <p className={s.isAccount}>Есть аккаунт? <Link to='/authorization/login'>Войти<FontAwesomeIcon
                        className={s.doorIcon}
                        icon={faDoorOpen}/></Link>
                    </p>
                    <div className={s.registrationWith}>
                        <div>Войти через <br/>
                            <FontAwesomeIcon className={s.vkIcon} icon={faVk}/></div>
                        <div onClick={handleLoginWithGoogle}>Войти через <br/>
                            <FontAwesomeIcon className={s.googleIcon} icon={faGoogle}/></div>
                    </div>
                    <SubmitButton handleClick={handleRegister} text='Зарегистрироваться'/>
                </form>
            </div>
        </div>
    );
};

export default AuthorizationForm;
