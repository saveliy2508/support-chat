import React from 'react';
import DialogCardComponent from "../../DialogsComponents/DialogCardComponent/DialogCardComponent";
import s from './newDialogsPage.module.scss'
import {Button, Input} from "reactstrap";
import {dataBase} from "../../../../firebase";
import {set, ref, push} from "firebase/database";
import {useSelector} from "react-redux";

const NewDialogsPage = () => {
    // На время тестов, пока нет приложения для клиента. После - удалить
    const [clientName, setClientName] = React.useState('');
    const [firstMessage, setFirstMessage] = React.useState('');
    //
    
    const {data} = useSelector((state) => state)
    const {dialogs} = useSelector(state => state.data)
    const handleAddNewDialog = () => {
        const date = new Date()
        const dialogsListRef = ref(dataBase, `users/${data.id}/dialogs`);
        const newDialogRef = push(dialogsListRef);
        set(newDialogRef, {
            dialogId: newDialogRef._path.pieces_[Object.keys(newDialogRef._path.pieces_).length - 1],
            clientName: clientName,
            startTime: date.getTime()
        });
    }

    return (
        <>
            <div className={s.title}>
                Страница новых диалогов
                {/* На время тестов, пока нет приложения для клиента. После - удалить */}
                <Input placeholder='Имя клиента' value={clientName} onChange={(e) => setClientName(e.target.value)}/>
                <Input placeholder='Первое сообщение' value={firstMessage} onChange={(e) => setFirstMessage(e.target.value)}/>
                <Button onClick={handleAddNewDialog}>Добавить новый диалог</Button>
                {/*    */}
            </div>
            <div className={s.dialogsCards}>
                {dialogs ?
                    Object.values(dialogs).map((item, index) => (
                        <div className={s.card}>
                            <DialogCardComponent/>
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