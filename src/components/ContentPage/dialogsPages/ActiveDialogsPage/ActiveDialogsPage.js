import React from 'react';
import DialogCardComponent from "./ActiveDialogsCardComponent/ActiveDialogCardComponent";
import s from './activeDialogsPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDialog} from "../../../../redux/actions/userActions";
import {useNavigate} from "react-router-dom";

const ActiveDialogsPage = () => {
    const {activeDialogs} = useSelector(state => state.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleContinue = (dialogId) => {
        dispatch(setCurrentDialog(dialogId))
        navigate(`/contentPage/${dialogId}`)
    }
    return (
        <>
            <div className={s.title}>
                ActiveDialogsPage
            </div>
            <div className={s.dialogsCards}>
                {activeDialogs ?
                    Object.values(activeDialogs).map((item, index) => (
                        <div className={s.card}>
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

export default ActiveDialogsPage;