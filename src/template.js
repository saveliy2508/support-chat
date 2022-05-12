import React from 'react';
import HeaderContentPage from "./HeaderContentPage/HeaderContentPage";
import s from './contentPage.module.scss'
import NavbarContentPage from "./NavbarContentPage/NavbarContentPage";
import {dataBase} from "../../firebase";
import {ref, set, onValue} from "firebase/database";
import {Button, Input} from "reactstrap";
import {useSelector} from "react-redux";

const ContentPage = () => {
    const [inputValue, setInputValue] = React.useState('');
    const {id} = useSelector(state => state.user)

    const handleClick = () => {
        if (inputValue.length > 0) {
            const date = new Date()
            set(ref(dataBase, `messages/${date.getTime()}`), {
                writtenBy: 'operator',
                operatorId: id,
                textMessage: inputValue,
                timestamp: date.getTime(),
                messageId: date.getTime()
            });
            setInputValue('')
        }
    }

    //test. need to remove in future
    const [state, setState] = React.useState([]);
    //
    const [filterInput, setFilterInput] = React.useState('');

    React.useEffect(() => {
        return () => {
            const dialogsRef = ref(dataBase, 'messages');
            onValue(dialogsRef, (snapshot) => {
                let data = snapshot.val();
                setState(Object.values(data))
            });
        };
    }, []);

    return (
        <div className={s.contentWrapper}>
            <HeaderContentPage/>
            <div className={s.content}>
                <div className={s.navBar}>
                    <NavbarContentPage/>
                </div>
                <div className={s.dialogs}>
                    <Input type="text" value={filterInput} onChange={(e) => setFilterInput(e.target.value)} placeholder='Фильтрация по тексту'/>
                    <div>
                        {state.filter(item => item.textMessage.includes(filterInput)).map((item, index) => (
                            <div>
                                <p>OperatorId: {item.writtenBy}</p>
                                <p>{item.textMessage}</p>
                            </div>
                        ))}
                    </div>
                    <Input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/><br/>
                    <Button onClick={handleClick}>Enter</Button>
                </div>
                <div className={s.clientInformation}>
                    {/*info*/}
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
