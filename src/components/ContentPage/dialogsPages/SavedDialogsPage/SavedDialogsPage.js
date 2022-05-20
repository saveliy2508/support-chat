import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import s from './savedDialogsPage.module.scss'

import {setCurrentDialog} from "../../../../redux/actions/userActions";
import DialogCardComponent from "./SavedDialogsCartComponent/SavedDialogsCartComponent";

const SavedDialogsPage = () => {
    const {activeDialogs} = useSelector(state => state.data)
    const {savedDialogsId} = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleContinue = (dialogId) => {
        dispatch(setCurrentDialog(dialogId))
        navigate(`/contentPage/${dialogId}`)
    }

    let activeArray;
    let savedArray;
    if (activeDialogs && savedDialogsId) {
        activeArray = Object.values(activeDialogs)
        savedArray = Object.values(Object.values(savedDialogsId))
    }

    return (
        <>
            <div className={s.title}>
                SavedDialogsPage
            </div>
            <div className={s.dialogsCards}>
                {savedArray && activeArray ?
                    activeArray.filter(j => savedArray.find(i => j.dialogId === i.dialogId ? true : null)).map((item, index) => (
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
