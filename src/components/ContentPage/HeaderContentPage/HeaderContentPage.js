import React from 'react';
import {Button} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "firebase/auth";
import {auth} from "../../../firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear} from "@fortawesome/free-solid-svg-icons";

import s from './headerContentPage.module.scss'

import {removeUser} from "../../../redux/actions/userActions";
import {removeData} from "../../../redux/actions/dataActions";

const HeaderContentPage = ({setIsOpenModal}) => {
    const dispatch = useDispatch()

    const {email} = useSelector(state => state.user)

    const delay = (ms) => new Promise(res => setTimeout(res, ms))

    const handleSignOut = async () => {
        await signOut(auth)
        dispatch(removeUser())
        dispatch(removeData())
        await delay(1000)
        dispatch(removeUser())
        dispatch(removeData())
    }

    return (
        <div className={s.headerWrapper}>
            <div className={s.text}>{email}</div>
            <div className={s.text}><FontAwesomeIcon icon={faGear} className={s.gear}
                                                     onClick={() => setIsOpenModal(true)}/></div>
            <Button color='primary' onClick={handleSignOut} className={s.exitButton}>Выйти</Button>
        </div>
    );
};

export default HeaderContentPage;
