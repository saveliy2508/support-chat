import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ref, set} from "firebase/database";
import {dataBase} from "../../../../firebase";

import s from './endedDialogsPage.module.scss'

import DialogCardComponent from "./EndedDialogsCardComponent/EndedDialogCardComponent";
import {setCurrentDialog} from "../../../../redux/actions/userActions";


const EndedDialogsPage = () => {
    const {activeDialogs} = useSelector(state => state.data)
    const {id} = useSelector(state => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleContinue = (dialogId) => {
        dispatch(setCurrentDialog(dialogId))
        navigate(`/contentPage/${dialogId}`)
    }

    const handleSaveDialog = (dialogId) => {
        const saveDialogRef = ref(dataBase, `users/${id}/savedDialogsId/${dialogId}`);
        set(saveDialogRef, {
            dialogId
        });
    }

    return (
        <div>
            <>
                <div className={s.title}>
                    EndedDialogsPage
                </div>
                <div className={s.dialogsCards}>
                    {activeDialogs ?
                        Object.values(activeDialogs).filter(item => item.ended == true).map((item, index) => (
                            <div className={s.card} key={'endedDialogs' + index}>
                                <DialogCardComponent
                                    clientName={item.clientName}
                                    startTime={item.startTime}
                                    dialogData={item}
                                    messages={item.messages}
                                    handleContinue={handleContinue}
                                    handleSaveDialog={handleSaveDialog}
                                    grade={item.grade}
                                />
                            </div>
                        ))
                        : null
                    }
                </div>
            </>
        </div>
    );
};

export default EndedDialogsPage;
