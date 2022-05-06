import s from './App.module.scss';
import React from "react";
import AuthorizationPage from "./components/AuthorizationPage/AuthorizationPage";
import RegistrationForm from "./components/RegistrationForm/RegistrationPage";
import MainPage from "./components/MainPage/MainPage";
import {Routes, Route, Navigate} from "react-router-dom";
import './firebase';
import {useDispatch, useSelector} from "react-redux";
import {authError, setUser} from "./redux/actions/userActions";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {app} from "./firebase";
import {useNavigate} from "react-router-dom";


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
    console.log(!!email)

    return (
        <div className={s.App}>
            <div className={s.appWrapper}>
                <Routes>
                    <Route path='/*' element={!!email ? <MainPage/> : <Navigate to='/login'/>}/>
                    <Route path='/login' element={<AuthorizationPage/>}/>
                    <Route path='/registration' element={<RegistrationForm/>}/>
                </Routes>
            </div>
            <div className={s.footer}></div>
        </div>
    );
}

export default App;
