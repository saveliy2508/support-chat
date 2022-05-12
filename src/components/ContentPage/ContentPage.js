import React from 'react';
import HeaderContentPage from "./HeaderContentPage/HeaderContentPage";
import s from './contentPage.module.scss'
import NavbarContentPage from "./NavbarContentPage/NavbarContentPage";
import {dataBase, auth} from "../../firebase";
import {ref, set} from "firebase/database";
import {Button, Input} from "reactstrap";

const ContentPage = () => {
    const [inputValue, setInputValue] = React.useState('');
    const handleClick = () => {
        if (inputValue.length > 0) {
            const data = new Date()
            set(ref(dataBase, `messages/${auth.currentUser.uid}/${data.getTime()}`), {
                message: inputValue,
            });
            setInputValue('')
        }
    }
    return (
        <div className={s.contentWrapper}>
            <HeaderContentPage/>
            <div className={s.content}>
                <div className={s.navBar}>
                    <NavbarContentPage/>
                </div>
                <div className={s.dialogs}>
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
