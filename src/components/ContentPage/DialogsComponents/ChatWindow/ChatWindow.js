import React from 'react';
import s from './chatWindow.module.scss'
import {Input, Button} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {push, ref, set} from "firebase/database";
import {dataBase} from "../../../../firebase";

const ChatWindow = () => {
    const navigate = useNavigate()
    const handleNavigateBack = () => {
        navigate(-1)
    }
    const {currentDialog, email} = useSelector(state => state.user)
    const {activeDialogs} = useSelector(state => state.data)
    const dialog = activeDialogs[[`${currentDialog}`]]
    const [textarea, setTextarea] = React.useState('');
    console.log(dialog)
    const handlePushNewMessage = () => {
        const date = new Date()
        const newMessageListRef = ref(dataBase, `activeDialogs/${currentDialog}/messages`);
        const newMessageRef = push(newMessageListRef);
        set(newMessageRef, {
            messageId: newMessageRef._path.pieces_[Object.keys(newMessageRef._path.pieces_).length - 1],
            text: textarea,
            timestamp: date.getTime(),
            senderName: email,
        });
    }

    return (
        <div className={s.chatWindow}>
            <div className={s.title}>
                <div className={s.clientName}>Client Name <br/><Button onClick={handleNavigateBack} color='primary'>{`<-- Назад`}</Button></div>
                <div className={s.searchInput}>Поиск:<Input/></div>
            </div>
            <div className={s.chat}>
                <div className={s.messages}>
                    {Object.values(dialog.messages).map((item, index) => (
                            <div className={s.message}>
                                <div className={s.text}>
                                    {item.text}
                                </div>
                                <div className={s.name}>
                                    {item.senderName}
                                </div>
                            </div>
                        )
                    )}
                </div>
                <div className={s.answerForm}>
                    <div className={s.answerInput}>
                        Введите ответ:
                        <Input
                            value={textarea}
                            onChange={e => setTextarea(e.target.value)}
                            className={s.textarea}
                            bsSize="sm"
                            type="textarea"
                        />
                        <Button onClick={handlePushNewMessage}>Отправить</Button>
                    </div>
                    <div className={s.template}>
                        Выбрать из готовых (in process)
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
