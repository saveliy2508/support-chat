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

    return (
        <>
            <div className={s.title}>
                SavedDialogsPage
            </div>
            <div className={s.dialogsCards}>
                {savedDialogsId && activeDialogs ?
                    activeDialogs.filter(activeDialogItem => Object.values(savedDialogsId).find(savedDialogId => activeDialogItem.dialogId === savedDialogId.dialogId ? true : null)).map((item, index) => (
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
