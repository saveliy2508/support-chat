import React from 'react';
import s from './AuthorizationPage.module.scss'
import {useFormik} from 'formik';
import * as yup from 'yup'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    setPersistence,
    browserSessionPersistence, onAuthStateChanged,
} from "firebase/auth";
import {authError, authErrorWithSocials, setUser} from './../../redux/actions/userActions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle, faVk} from "@fortawesome/free-brands-svg-icons";

const AuthorizationPage = (props) => {
    const dispatch = useDispatch()
    const {errorMessage} = useSelector((user) => user.user)
    const navigate = useNavigate()
    const auth = getAuth()
    const handleLogin = (email, password) => {
        const auth = getAuth();
        // setPersistence(auth, browserSessionPersistence)
        //     .then(() => {
                return signInWithEmailAndPassword(auth, email, password)
                    .then(({user}) => {
                        dispatch(setUser({
                            email: user.email,
                            id: user.uid,
                            token: user.accessToken
                        }))
                        navigate('/')
                    })
                    .catch(() => dispatch(authError()))
            // })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
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
                navigate('/')
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
        <div className={s.authorizationForm}>
            <img src="./img/logo.png" alt="Логотип"/>
            <div className={s.text}>Войти в Rocket support</div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Почта</label>
                <input
                    type="text"
                    name='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                <p className={s.error}>{formik.errors.email && formik.touched.email ? formik.errors.email : null}</p>
                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                <p className={s.error}>{formik.errors.password && formik.touched.password ? formik.errors.password : null || errorMessage}</p>
                <p className={s.isAccount}>Нет аккаунта? <Link to='/registration'>Регистрация</Link></p>
                <div className={s.registrationWith}>
                    <div>Войти через <br/>
                        <FontAwesomeIcon className={s.vkIcon} icon={faVk}/></div>
                    <div onClick={handleRegisterWithGoogle}>Войти через <br/>
                        <FontAwesomeIcon className={s.googleIcon} icon={faGoogle}/></div>
                </div>
                <button type='submit'>Войти
                </button>
            </form>
        </div>
    );
};

export default AuthorizationPage;