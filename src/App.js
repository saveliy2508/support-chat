import s from './App.module.scss';
import React from "react";
import LogInPage from "./components/Authorization/LogInPage/LogInPage";
import RegistrationForm from "./components/Authorization/SignUpPage/SignUpPage";
import {Routes, Route, Navigate} from "react-router-dom";
import './firebase';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "./redux/actions/userActions";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import ForgetPassword from "./components/Authorization/ForgotPasswordPage/ForgotPasswordPage";
import ContentPage from "./components/ContentPage/ContentPage";
import {onValue, ref} from "firebase/database";
import {dataBase} from "./firebase";
import {setUserData} from "./redux/actions/dataActions";

function App() {
    const {email, id} = useSelector((state) => state.user)
    const auth = getAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        return () => {
            const dialogsRef = ref(dataBase, `users/${id}`);
            onValue(dialogsRef, (snapshot) => {
                let data = snapshot.val();
                dispatch(setUserData(data))
            });
        };
    }, []);
    // React.useEffect(() => {
    //     return () => {
    //         onAuthStateChanged(auth, user => {
    //             user ?
    //                 dispatch(setUser({
    //                     email: user.email,
    //                     id: user.uid,
    //                     token: user.accessToken
    //                 })) && navigate('/')
    //                 :
    //                 dispatch(setUser({
    //                     email: null,
    //                     id: null,
    //                     token: null
    //                 }))
    //         });
    //     };
    // }, []);

    return (
        <div className={s.App}>
            <div className={s.appWrapper}>
                <Routes>
                    <Route path="*" element={!!email ? <Navigate to='/contentPage/newDialogs'/> : <Navigate to='/authorization/login'/>} />
                    <Route path='/authorization/login' element={!!email ? <Navigate to='/contentPage/newDialogs'/> : <LogInPage/>}/>
                    <Route path='/authorization/registration' element={!!email ? <Navigate to='/contentPage/newDialogs'/> : <RegistrationForm/>}/>
                    <Route path='/authorization/forgetPassword' element={!!email ? <Navigate to='/contentPage/newDialogs'/> : <ForgetPassword/>}/>
                    <Route path='/contentPage/*' element={!!email ? <ContentPage/> : <Navigate to='/authorization/login'/>}/>
                </Routes>
            </div>
            <div className={s.footer}></div>
        </div>
    );
}

export default App;
