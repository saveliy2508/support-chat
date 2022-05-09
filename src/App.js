import s from './App.module.scss';
import React from "react";
import LogInPage from "./components/Authorization/LogInPage/LogInPage";
import RegistrationForm from "./components/Authorization/SignUpPage/SignUpPage";
import MainPage from "./components/MainContentPage/MainPage/MainPage";
import {Routes, Route, Navigate} from "react-router-dom";
import './firebase';
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "./redux/actions/userActions";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import ForgetPassword from "./components/Authorization/ForgotPasswordPage/ForgotPasswordPage";


function App() {
    const {email} = useSelector((state) => state.user)
    const auth = getAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    React.useEffect(() => {
        return () => {
            onAuthStateChanged(auth, user => {
                user ?
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.accessToken
                    })) && navigate('/')
                    :
                    dispatch(setUser({
                        email: null,
                        id: null,
                        token: null
                    }))
            });
        };
    }, []);

    return (
        <div className={s.App}>
            <div className={s.appWrapper}>
                <Routes>
                    <Route path='/*' element={!!email ? <MainPage/> : <Navigate to='/login'/>}/>
                    <Route path='/login' element={<LogInPage/>}/>
                    <Route path='/registration' element={<RegistrationForm/>}/>
                    <Route path='/forgetPassword' element={<ForgetPassword/>}/>
                </Routes>
            </div>
            <div className={s.footer}></div>
        </div>
    );
}

export default App;
