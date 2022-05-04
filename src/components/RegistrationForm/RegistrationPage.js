import React from 'react';
import s from '../AuthorizationPage/AuthorizationPage.module.scss'
import {useFormik} from 'formik';
import * as yup from 'yup'
import {Link, useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from 'react-redux'
import {setUser} from "../../redux/actions/userActions";
import {faDoorOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const AuthorizationForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user})=> {
                dispatch(setUser({
                    email:user.email,
                    id: user.uid,
                    token: user.accessToken
                }))
                navigate('/')
            })
            .catch(console.error)
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
                handleRegister(values.email, values.password)
            }
        }
    )

    return (
        <div className={s.authorizationForm}>
            <img src="./img/logo.png" alt="Логотип"/>
            <div className={s.text}>Регистрация в Rocket chat</div>
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
                <p className={s.error}>{formik.errors.password && formik.touched.password ? formik.errors.password : null}</p>
                <p className={s.isAccount}>Есть аккаунт? <Link to='/login'>Войти<FontAwesomeIcon className={s.doorIcon} icon={faDoorOpen}/></Link></p>
                <button type='submit'>Регистрация</button>
            </form>
        </div>
    );
};

export default AuthorizationForm;
