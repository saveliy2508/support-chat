import React from 'react';
import {Button} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "firebase/auth";
import {auth} from "../../../firebase";
import {removeUser} from "../../../redux/actions/userActions";
import s from './headerContentPage.module.scss'
import {removeData} from "../../../redux/actions/dataActions";

const HeaderContentPage = () => {
    const dispatch = useDispatch()
    const {email} = useSelector(state => state.user)

    const handleSignOut = async () => {
        await signOut(auth)
        dispatch(removeUser())
        dispatch(removeData())
    }
    return (
        <div className={s.headerWrapper}>
            <div className={s.text}>{email}</div>
            <Button color='primary' onClick={handleSignOut} className={s.exitButton}>Выйти</Button>
        </div>
    );
};

export default HeaderContentPage;
