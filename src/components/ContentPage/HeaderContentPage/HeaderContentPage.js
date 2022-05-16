import React from 'react';
import {Button} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "firebase/auth";
import {auth, dataBase} from "../../../firebase";
import {removeUser, setSavedDialogs} from "../../../redux/actions/userActions";
import s from './headerContentPage.module.scss'
import {removeData, setActiveDialogs, setNewDialogs} from "../../../redux/actions/dataActions";
import {onValue, ref, off} from "firebase/database";

const HeaderContentPage = ({handleOff}) => {
    const dispatch = useDispatch()
    const {email, id} = useSelector(state => state.user)
    const handleSignOut = async () => {
        await signOut(auth)
        handleOff()
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
