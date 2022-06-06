import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faUser} from "@fortawesome/free-solid-svg-icons";
import {Form, Field} from "react-final-form";
import {Input, Button} from "reactstrap";
import {get, ref, set} from "firebase/database";
import {dataBase} from "../../../firebase";
import {useDispatch, useSelector} from "react-redux";

import s from "./modalSetting.module.scss";


import {setNameAvatar} from "../../../redux/actions/userActions";

const ModalSettings = ({setIsOpenModal}) => {
    const {id, name, avatar} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const onSubmit = async ({name, avatar}) => {
        if (name) {
            await set(ref(dataBase, `users/${id}/name`), name);
        }
        if (avatar) {
            await set(ref(dataBase, `users/${id}/avatar`), avatar);
        }

        const userDataIdRef = ref(dataBase, `users/${id}`);
        await get(userDataIdRef).then(
            (snapshot) => {
                let data = snapshot.val();

                let name;
                let avatar;
                if (data.hasOwnProperty('name')) {
                    name = data.name;
                }
                if (data.hasOwnProperty('avatar')) {
                    avatar = data.avatar;
                }

                dispatch(setNameAvatar({
                    name: name,
                    avatar: avatar,
                }))
            });
    };

    const [currentAvatarInput, setCurrentAvatarInput] = React.useState(avatar);

    const validate = (e) => {
        setCurrentAvatarInput(e.avatar)
    };

    const initialData = {name: name, avatar: currentAvatarInput}
    return (
        <div className={s.modal}>
            <div className={s.modalHeader}>
                <div className={s.title}>Настройки</div>
                <div className={s.xmark}>
                    <FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => setIsOpenModal(false)}
                    />
                </div>
            </div>
            <div className={s.settings}>
                <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    initialValues={initialData}
                    render={({handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <div className={s.name}>
                                <Field
                                    name="name"
                                    render={({input}) => (
                                        <div>
                                            <label className={s.text}>Имя:</label>
                                            <Input {...input} autoComplete='off' placeholder='Введите имя...'/>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className={s.avatar}>
                                <Field
                                    name="avatar"
                                    render={({input}) => (
                                        <div>
                                            <label className={s.text}>Аватар:</label>
                                            <span className={s.avatarImg}>
                                                {currentAvatarInput ? <img src={currentAvatarInput} alt="аватар" className={s.img}/> :
                                                    <FontAwesomeIcon icon={faUser} className={s.userIcon} className={s.img}/>}
                                            </span>
                                            <Input {...input} autoComplete='no'
                                                   placeholder='Введите url адрес изображения...'
                                                   className={s.avatarImgInput}/>
                                        </div>
                                    )}
                                />
                            </div>
                            <br/>
                            <Button type="submit">Сохранить изменения имени и аватара</Button>
                        </form>
                    )}
                />
                <div className={s.passwordChange}>
                    <div className={s.text}>Изменение пароля</div>
                    <Button type="submit">Отправить письмо на почту</Button>
                </div>
            </div>
        </div>
    );
};

export default ModalSettings;
