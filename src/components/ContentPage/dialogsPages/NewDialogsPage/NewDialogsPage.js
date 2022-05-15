import React from 'react';
import NewDialogCardComponent from "./NewDialogCardComponent/NewDialogCardComponent";
import s from './newDialogsPage.module.scss'
import {Button, Input} from "reactstrap";
import {dataBase} from "../../../../firebase";
import {set, ref, push} from "firebase/database";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setCurrentDialog} from "../../../../redux/actions/userActions";

const NewDialogsPage = () => {

    // На время тестов, пока нет приложения для клиента. После - удалить
    const [clientName, setClientName] = React.useState('');
    const [firstMessage, setFirstMessage] = React.useState('');
    //

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {newDialogs} = useSelector(state => state.data)

    const handleAddNewDialog = () => {
        const date = new Date()
        const dialogsListRef = ref(dataBase, `newDialogs`);
        const newDialogRef = push(dialogsListRef);
        set(newDialogRef, {
            dialogId: newDialogRef._path.pieces_[Object.keys(newDialogRef._path.pieces_).length - 1],
            clientName: clientName,
            startTime: date.getTime()
        });
        const firstMessageListRef = ref(dataBase, `newDialogs/${newDialogRef._path.pieces_[Object.keys(newDialogRef._path.pieces_).length - 1]}/messages`);
        const firstMessageRef = push(firstMessageListRef);
        set(firstMessageRef, {
            messageId: firstMessageRef._path.pieces_[Object.keys(firstMessageRef._path.pieces_).length - 1],
            text: firstMessage,
            timestamp: date.getTime(),
            senderName: 'client'
        });
    }

    const handleAddToActiveDialogs = (clientName, dialogId, startTime, messages) => {
        set(ref(dataBase, `activeDialogs/${dialogId}`), {
            clientName: clientName,
            dialogId: dialogId,
            startTime: startTime,
            messages: messages,
        })
        set(ref(dataBase, `newDialogs/${dialogId}`), null)
        dispatch(setCurrentDialog(dialogId))
        navigate(`/contentPage/${dialogId}`)
    }

    return (
        <>
            <div className={s.title}>
                Страница новых диалогов
                {/* На время тестов, пока нет приложения для клиента. После - удалить */}
                <Input placeholder='Имя клиента' value={clientName} onChange={(e) => setClientName(e.target.value)}/>
                <Input placeholder='Первое сообщение' value={firstMessage}
                       onChange={(e) => setFirstMessage(e.target.value)}/>
                <Button onClick={handleAddNewDialog}>Добавить новый диалог</Button>
                {/*    */}
            </div>
            <div className={s.dialogsCards}>
                {newDialogs ?
                    Object.values(newDialogs).map((item, index) => (
                        <div className={s.card} key={item.dialogId + index}>
                            <NewDialogCardComponent
                                clientName={item.clientName}
                                startTime={item.startTime}
                                dialogData={item}
                                handleAddToActiveDialogs={handleAddToActiveDialogs}
                                messages={item.messages}
                                senderName={item.senderName}
                            />
                        </div>
                    ))
                    :
                    null
                }
            </div>
        </>
    );
};

export default NewDialogsPage;