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
import {onValue, ref, get} from "firebase/database";
import {dataBase} from "./firebase";
import {setActiveDialogs, setNewDialogs, setUserData} from "./redux/actions/dataActions";

function App() {
    const {email, id} = useSelector((state) => state.user)
    const auth = getAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    React.useEffect(() => {
        return () => {
            const userRef = ref(dataBase, `users/${id}`);
            onValue(userRef, (snapshot) => {
                let data = snapshot.val();
                dispatch(setUserData(data))
            });

            const newDialogsRef = ref(dataBase, `newDialogs`);
            onValue(newDialogsRef, (snapshot) => {
                let dialogs = snapshot.val();
                dispatch(setNewDialogs(dialogs))
            });

            const activeDialogsRef = ref(dataBase, `activeDialogs`);
            onValue(activeDialogsRef, (snapshot) => {
                let dialogs = snapshot.val();
                dispatch(setActiveDialogs(dialogs))
            });
        };
    }, []);

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
