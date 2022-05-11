import React from 'react';
import s from '../AuthorisationStyles.module.scss';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {authError, authErrorWithSocials, setUser} from '../../../redux/actions/userActions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle, faVk} from "@fortawesome/free-brands-svg-icons";
import Form from './../AuthorizationComponents/Form/Form';
import SubmitButton from "./../AuthorizationComponents/SubmitButton/SubmitButton";
import Input from "../AuthorizationComponents/Input/Input";

const LogInPage = (props) => {
    const dispatch = useDispatch()
    const {errorMessage} = useSelector((user) => user.user)
    const navigate = useNavigate()
    const auth = getAuth()
    const handleLogin = (email, password) => {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }))
                navigate('/contentPage/')
            })
            .catch(() => dispatch(authError()))
    }

    const provider = new GoogleAuthProvider();
    const handleRegisterWithGoogle = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((responce) => {
                const user = responce.user
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }))
                navigate('/contentPage/')
            })
            .catch(() => dispatch(authErrorWithSocials()))
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
        <div className={s.authorizationFormConteiner}>
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
                    <p className={s.error}>{formik.errors.password && formik.touched.password ? formik.errors.password : null || errorMessage}</p>
                    <div className={s.footer}>
                        <p className={s.isAccount}>Нет аккаунта? <br/><Link
                            to='/authorization/registration'>Регистрация</Link></p>
                        <p className={s.isAccount}>Забыли пароль? <br/><Link
                            to='/authorization/forgetPassword'>Восстановить</Link></p>
                    </div>
                    <div className={s.registrationWith}>
                        <div>Войти через <br/>
                            <FontAwesomeIcon className={s.vkIcon} icon={faVk}/></div>
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