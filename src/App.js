import React from "react";
import {useNavigate} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ref, get, query, orderByChild, equalTo, set} from "firebase/database";
import {dataBase} from "./firebase";
import './firebase';

import s from './App.module.scss';

import LogInPage from "./components/Authorization/LogInPage/LogInPage";
import RegistrationForm from "./components/Authorization/SignUpPage/SignUpPage";
import ForgetPassword from "./components/Authorization/ForgotPasswordPage/ForgotPasswordPage";
import ContentPage from "./components/ContentPage/ContentPage";

import {setUser} from "./redux/actions/userActions";
import {setActiveDialogs, setNewDialogs} from "./redux/actions/dataActions";


function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {email} = useSelector((state) => state.user)


    const loginFunction = async (responce) => {
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

        const activeDialogsRef = query(ref(dataBase, 'activeDialogs'), orderByChild('operatorId'), equalTo(user.uid))
        get(activeDialogsRef).then(
            (snapshot) => {
                let dialogs = snapshot.val();
                dispatch(setActiveDialogs(dialogs))
            });
        navigate('/contentPage/')
    }

    return (
        <div className={s.App}>
            <div className={s.appWrapper}>
                <Routes>
                    <Route path="*" element={!!email ? <Navigate to='/contentPage/newDialogs'/> :
                        <Navigate to='/authorization/login'/>}/>
                    <Route path='/authorization/login'
                           element={!!email ? <Navigate to='/contentPage/newDialogs'/> : <LogInPage loginFunction={loginFunction}/>}/>
                    <Route path='/authorization/registration'
                           element={!!email ? <Navigate to='/contentPage/newDialogs'/> : <RegistrationForm loginFunction={loginFunction}/>}/>
                    <Route path='/authorization/forgetPassword'
                           element={!!email ? <Navigate to='/contentPage/newDialogs'/> : <ForgetPassword/>}/>
                    <Route path='/contentPage/*' element={!!email ? <ContentPage/> :
                        <Navigate to='/authorization/login'/>}/>
                </Routes>
            </div>
            <div className={s.footer}></div>
        </div>
    );
}

export default App;
