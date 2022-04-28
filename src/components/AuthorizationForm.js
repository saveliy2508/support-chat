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
                email: yup.string().email('Неверный емейл').required('Обязательное поле'),
                password: yup.string().required('Введите пароль')
            }),
            onSubmit: (values) => {
                console.log(values)
            }
        }
    )

    return (
        <div className={s.authorizationForm}>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email</label><br/>
                <input
                    type="text"
                    name='email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                /><br/>
                {formik.errors.email && formik.touched.email ? <p>{formik.errors.email}</p> : null}
                <label htmlFor="password">Password</label><br/>
                <input
                    type="password"
                    name='password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                /><br/>
                {formik.errors.password && formik.touched.password ? <p>{formik.errors.password}</p> : null}
                <button type='submit'>SUBMIT</button>
            </form>
        </div>
    );
};

export default AuthorizationForm;
