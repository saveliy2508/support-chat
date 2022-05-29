import React from 'react';
import {useNavigate} from "react-router-dom";
import {dataBase} from "../../../../firebase";
import {set, ref, push} from "firebase/database";
import {useDispatch, useSelector} from "react-redux";
import {ButtonGroup, Button, Input} from "reactstrap";
import debounce from 'lodash.debounce'

import s from './newDialogsPage.module.scss'

import NewDialogCardComponent from "./NewDialogCardComponent/NewDialogCardComponent";
import {setCurrentDialog} from "../../../../redux/actions/userActions";

const NewDialogsPage = () => {
        // На время тестов, пока нет приложения для клиента. После - удалить
        const [clientName, setClientName] = React.useState('');
        const [firstMessage, setFirstMessage] = React.useState('');
        //

        const dispatch = useDispatch()

        const navigate = useNavigate()

        const {newDialogs} = useSelector(state => state.data)
        const {id} = useSelector(state => state.user)

        //Фильтрация по имени и по последнему сообщению + debounce
        const [radioButton, setRadioButton] = React.useState('имени');
        const [filterInput, setFilterInput] = React.useState('');
        const debounceFilterInput = debounce((e) => setFilterInput(e.target.value), 400)
        //

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
                operatorId: id,
            })
            set(ref(dataBase, `newDialogs/${dialogId}`), null)
            dispatch(setCurrentDialog(dialogId))
            navigate(`/contentPage/${dialogId}`)

            const startedActiveDialogsIdRef = ref(dataBase, `users/${id}/startedActiveDialogsId/${dialogId}`);
            set(startedActiveDialogsIdRef, {
                dialogId
            });
        }
        return (
            <>
                <div className={s.header}>
                    <div className={s.title}>
                        Страница новых диалогов
                    </div>
                    <div className={s.input}>
                        Поиск по:
                        <ButtonGroup>
                            <Button
                                color="secondary"
                                onClick={() => setRadioButton('имени')}
                            >
                                Имени
                            </Button>
                            <Button
                                color="secondary"
                                onClick={() => setRadioButton('сообщению')}
                            >
                                Сообщению
                            </Button>
                        </ButtonGroup>
                        <Input placeholder={`поиск по ${radioButton}`}
                               onChange={debounceFilterInput}/>
                    </div>
                </div>

                {/* На время тестов, пока нет приложения для клиента. После - удалить */}
                <Input placeholder='Имя клиента' value={clientName} onChange={(e) => setClientName(e.target.value)}
                       className={s.filterInput}/>
                <Input placeholder='Первое сообщение' value={firstMessage}
                       onChange={(e) => setFirstMessage(e.target.value)}/>
                <Button onClick={handleAddNewDialog}>Добавить новый диалог</Button>
                {/*    */}
                <div className={s.dialogsCards}>

                    {newDialogs ?
                        newDialogs
                            .filter(radioButton == 'имени'
                                ? item => item.clientName.toLowerCase().includes(filterInput.toLowerCase())
                                : item => Object.values(item.messages)[Object.values(item.messages).length - 1].text.toLowerCase().includes(filterInput.toLowerCase()))
                            .map((item, index) => (
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
    }
;

export default NewDialogsPage;