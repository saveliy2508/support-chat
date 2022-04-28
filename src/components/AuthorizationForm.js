import React from 'react';
import s from './AuthorizationForm.module.scss'
import {useFormik} from 'formik';
import * as yup from 'yup'

const AuthorizationForm = (props) => {
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
                console.log(values)
            }
        }
    )

    return (
            <div className={s.authorizationForm}>
                <img src="./img/logo.png" alt="Логотип"/>
                <div className={s.text}>Войти в React chat</div>
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
                    <button type='submit'>Войти</button>
                </form>
            </div>
    );
};

export default AuthorizationForm;
