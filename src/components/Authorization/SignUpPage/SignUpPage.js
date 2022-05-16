import React from 'react';
import s from '../AuthorisationStyles.module.scss'
import {useFormik} from 'formik';
import * as yup from 'yup'
import {Link, useNavigate} from "react-router-dom";
import {getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {useDispatch, useSelector} from 'react-redux'
import {setUser} from "../../../redux/actions/userActions";
import {authErrorWithSocials} from "../../../redux/actions/authErrorActions";
import {faDoorOpen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVk, faGoogle} from "@fortawesome/free-brands-svg-icons";
import Form from './../AuthorizationComponents/Form/Form'
import SubmitButton from "./../AuthorizationComponents/SubmitButton/SubmitButton";
import Input from "../AuthorizationComponents/Input/Input";
import {get, ref, set} from "firebase/database";
import {dataBase} from "../../../firebase";
import {setActiveDialogs, setNewDialogs} from "../../../redux/actions/dataActions";
import {toast} from "react-toastify";

const AuthorizationForm = () => {
    const notify = () => toast.info('Ошибка', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
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
                set(ref(dataBase, `users/${user.uid}`), {
                    email: user.email,
                    id: user.uid,
                });
                navigate('/contentPage/')
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
            })
            .catch(() => notify())
    }


    const provider = new GoogleAuthProvider();
    const handleLoginWithGoogle = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((responce) => {
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
        <div className={s.authorizationFormConteiner}>
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
                    <p className={s.error}>{formik.errors.password && formik.touched.password ? formik.errors.password : null || errorMessage}</p>
                    <p className={s.isAccount}>Есть аккаунт? <Link to='/login'>Войти<FontAwesomeIcon
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
