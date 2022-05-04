import s from './App.module.scss';
import AuthorizationPage from "./components/AuthorizationPage/AuthorizationPage";
import RegistrationForm from "./components/RegistrationForm/RegistrationPage";
import MainPage from "./components/MainPage/MainPage";
import {Routes, Route, Navigate} from "react-router-dom";
import './firebase';
import {useSelector} from "react-redux";

function App() {
    const {email} = useSelector((state) => state.user)
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
