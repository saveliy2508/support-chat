import React from 'react';
import {Input, Button} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {push, ref, set} from "firebase/database";
import {dataBase} from "../../../../firebase";

import s from './chatWindow.module.scss'

const ChatWindow = () => {
    const navigate = useNavigate()

    const handleNavigateBack = () => {
        navigate(-1)
    }

    const {currentDialog, email} = useSelector(state => state.user)
    const {activeDialogs} = useSelector(state => state.data)

    const dialog = activeDialogs[activeDialogs.indexOf(activeDialogs.find(item => item.dialogId == currentDialog))]

    const [textarea, setTextarea] = React.useState('');

    const [openInput, setOpenInput] = React.useState(false);
    const [inputImgValue, setInputImgValue] = React.useState('');


    const handlePushNewMessage = () => {
        if (textarea) {
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
    }

    const handlePushNewImgMessage = () => {
        if (inputImgValue) {
            const date = new Date()
            const newMessageListRef = ref(dataBase, `activeDialogs/${currentDialog}/messages`);
            const newMessageRef = push(newMessageListRef);
            set(newMessageRef, {
                messageId: newMessageRef._path.pieces_[Object.keys(newMessageRef._path.pieces_).length - 1],
                imgSrc: inputImgValue,
                timestamp: date.getTime(),
                senderName: email,
            });
            setInputImgValue('')
        }
        setOpenInput(false)
    }

    return (
        <div className={s.chatWindow}>
            <div className={s.title}>
                <div className={s.clientName}>Client Name <br/><Button onClick={handleNavigateBack}
                                                                       color='primary'>{`<-- Назад`}</Button></div>
                <div className={s.searchInput}>Поиск:<Input/></div>
            </div>
            <div className={s.chat}>
                <div className={s.messages}>
                    {Object.values(dialog.messages).map((item, index) => (
                            <div key={'currentDialog' + index} className={s.message}>
                                <div className={s.text}>
                                    {item.text ? item.text :
                                        <img className={s.messageImg} src={item.imgSrc} alt='Image Error'/>}
                                </div>
                                <div className={s.name}>
                                    {item.senderName}
                                </div>
                                <div className={s.name}>
                                    {item.timestamp}
                                </div>
                            </div>
                        )
                    )}
                </div>
                {dialog.ended !== true &&
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
                        {/* выбрать из готовых */}
                        <div className={s.template}>
                            {openInput ? <Button onClick={handlePushNewImgMessage}>Отправить изображение</Button> :
                                <Button onClick={() => setOpenInput(true)}>Добавить изображение</Button>}
                            {openInput &&
                                <Input
                                    value={inputImgValue}
                                    onChange={e => setInputImgValue(e.target.value)}
                                    placeholder='Введите ссылку на изображение'
                                    type="text"
                                />}
                            {/*Выберите из готовых:*/}
                            {/*<Input list='answers'/>*/}
                            {/*<datalist id='answers'>*/}
                            {/*    <option value="Ke11k11" />*/}
                            {/*    <option value="222 sadasd asd as asdasd aw olds sdf ksdf sdlf sldflsdfl sdf ldslfsdlf ldlsflsdlf" />*/}
                            {/*    <option value="333" />*/}
                            {/*    <option value="ke444k" />*/}
                            {/*    <option value="ke555k" />*/}
                            {/*</datalist>*/}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default ChatWindow;
