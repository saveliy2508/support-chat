import React from 'react';
import s from '../AuthorizationPage/AuthorizationPage.module.scss'
import {useFormik} from 'formik';
import * as yup from 'yup'
import {Link, useNavigate} from "react-router-dom";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider
} from "firebase/auth";
import {useDispatch, useSelector} from 'react-redux'
import {authErrorWithSocials, setUser} from "../../redux/actions/userActions";
import {faDoorOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVk, faGoogle} from "@fortawesome/free-brands-svg-icons";

const AuthorizationForm = (props) => {
    const {errorMessage} = useSelector((user) => user.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken
                }))
                navigate('/')
            })
            .catch(console.error)
    }


    const provider = new GoogleAuthProvider();
    const handleLoginWithGoogle = () => {
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
        <div className={s.authorizationForm}>
            <img src="./img/logo.png" alt="Логотип"/>
            <div className={s.text}>Регистрация в Rocket support</div>
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
                    type="text"
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                <p className={s.error}>{formik.errors.password && formik.touched.password ? formik.errors.password : null || errorMessage}</p>
                <p className={s.isAccount}>Есть аккаунт? <Link to='/login'>Войти<FontAwesomeIcon className={s.doorIcon}
                                                                                                 icon={faDoorOpen}/></Link>
                </p>
                <div className={s.registrationWith}>
                    <div>Войти через <br/>
                        <FontAwesomeIcon className={s.vkIcon} icon={faVk}/></div>
                    <div onClick={handleLoginWithGoogle}>Войти через <br/>
                        <FontAwesomeIcon className={s.googleIcon} icon={faGoogle}/></div>
                </div>
                <button type='submit'>Регистрация</button>
            </form>
        </div>
    );
};

export default AuthorizationForm;
