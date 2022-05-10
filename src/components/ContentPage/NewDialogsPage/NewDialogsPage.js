import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeUser} from "../../../redux/actions/userActions";
import {signOut} from "firebase/auth";
import {auth} from "../../../firebase";
import s from './newDialogsPage.module.scss'
import {useNavigate} from "react-router-dom";

const NewDialogsPage = () => {
    const dispatch = useDispatch()
    const {email} = useSelector(state => state.user)
    const navigate = useNavigate()

    const handleSignOut = async () => {
        await signOut(auth)
        dispatch(removeUser())
        navigate('/authorization/login')
    }

    return (
        <div>
            <h1>HOMEPAGE</h1>
            <button onClick={handleSignOut}>Log out from {email}</button>
        </div>
    );
};

export default NewDialogsPage;