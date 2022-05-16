import React from 'react';
import s from '../AuthorisationStyles.module.scss';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {setUser} from '../../../redux/actions/userActions';
import {logInError, authErrorWithSocials, clearError} from "../../../redux/actions/authErrorActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle, faVk} from "@fortawesome/free-brands-svg-icons";
import Form from './../AuthorizationComponents/Form/Form';
import SubmitButton from "./../AuthorizationComponents/SubmitButton/SubmitButton";
import Input from "../AuthorizationComponents/Input/Input";
import {get, onValue, ref, set} from "firebase/database";
import {dataBase} from "../../../firebase";
import {setActiveDialogs, setNewDialogs, setUserData} from "../../../redux/actions/dataActions";
import {toast, ToastContainer} from "react-toastify";

const LogInPage = () => {
    const notify = () => toast.info('Ошибка входа', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = (email, password) => {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
            .then(((responce) => {
                const user = responce.user
                let savedDialogsId;
                const savedDialogsIdRef = ref(dataBase, `users/${user.uid}/savedDialogsId`);
                get(savedDialogsIdRef).then(
                    (snapshot) => {
                        savedDialogsId = snapshot.val();
                    });
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                    savedDialogsId: savedDialogsId,
                }))
                set(ref(dataBase, `users/${user.uid}/email`), user.email);
                set(ref(dataBase, `users/${user.uid}/id`), user.uid);

                const newDialogsRef = ref(dataBase, `newDialogs`);
                get(newDialogsRef).then(
                    (snapshot) => {
                        let dialogs = snapshot.val();
                        dispatch(setNewDialogs(dialogs))
                    });

                const activeDialogsRef = ref(dataBase, `activeDialogs`);
                get(activeDialogsRef).then(
                    (snapshot) => {
                        let dialogs = snapshot.val();
                        dispatch(setActiveDialogs(dialogs))
                    });
                navigate('/contentPage/')
            }))
            .catch(() => notify())
    }
    const provider = new GoogleAuthProvider();
    const handleRegisterWithGoogle = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(async(responce) => {
                const user = responce.user
                let savedDialogsId;
                const savedDialogsIdRef = await ref(dataBase, `users/${user.uid}/savedDialogsId`);
                await get(savedDialogsIdRef).then(
                    (snapshot) => {
                        savedDialogsId = snapshot.val();
                    });
                let startedActiveDialogsId;
                const startedActiveDialogsRef = await ref(dataBase, `users/${user.uid}/startedActiveDialogsId`);
                await get(startedActiveDialogsRef).then(
                    (snapshot) => {
                        startedActiveDialogsId = snapshot.val();
                    });
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                    savedDialogsId: savedDialogsId,
                    startedActiveDialogsId: startedActiveDialogsId
                }))
                set(ref(dataBase, `users/${user.uid}/email`), user.email);
                set(ref(dataBase, `users/${user.uid}/id`), user.uid);

                const newDialogsRef = ref(dataBase, `newDialogs`);
                get(newDialogsRef).then(
                    (snapshot) => {
                        let dialogs = snapshot.val();
                        dispatch(setNewDialogs(dialogs))
                    });

                const activeDialogsRef = ref(dataBase, `activeDialogs`);
                get(activeDialogsRef).then(
                    (snapshot) => {
                        let dialogs = snapshot.val();
                        dispatch(setActiveDialogs(dialogs))
                    });
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
                    <p className={s.error}>{formik.errors.password && formik.touched.password ? formik.errors.password : null}</p>
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