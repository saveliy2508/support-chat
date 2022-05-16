import React from 'react';
import DialogCardComponent from "./SavedDialogsCartComponent/SavedDialogsCartComponent";
import s from './savedDialogsPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDialog} from "../../../../redux/actions/userActions";
import {useNavigate} from "react-router-dom";
import {push, ref, set} from "firebase/database";
import {dataBase} from "../../../../firebase";

const SavedDialogsPage = () => {
    const {activeDialogs} = useSelector(state => state.data)
    const {id, savedDialogsId} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleContinue = (dialogId) => {
        dispatch(setCurrentDialog(dialogId))
        navigate(`/contentPage/${dialogId}`)
    }

    //Фильтрация
    const activeArray = Object.values(activeDialogs)
    const savedArray = Object.values(Object.values(savedDialogsId))
    console.log(savedArray)
    return (
        <>
            <div className={s.title}>
                SavedDialogsPage
            </div>
            <div className={s.dialogsCards}>
                {savedArray ?
                    activeArray.filter(item => savedArray.find(x => item.dialogId == x.dialogId ? true : null)).map((item, index) => (
                        <div className={s.card} key={'activeDialogs' + index}>
                            <DialogCardComponent
                                clientName={item.clientName}
                                startTime={item.startTime}
                                dialogData={item}
                                messages={item.messages}
                                handleContinue={handleContinue}
                            />
                        </div>
                    ))
                    : null
                }
            </div>
        </>
    );
};

export default SavedDialogsPage;
