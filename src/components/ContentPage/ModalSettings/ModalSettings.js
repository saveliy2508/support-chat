import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faUser} from "@fortawesome/free-solid-svg-icons";
import {Form, Field} from "react-final-form";

import s from "./modalSetting.module.scss";
import {Input, Button} from "reactstrap";
import {ref, set} from "firebase/database";
import {dataBase} from "../../../firebase";
import {useSelector} from "react-redux";

const ModalSettings = ({setIsOpenModal}) => {
    const {id} = useSelector(state => state.user)

    const onSubmit = ({name, avatar}) => {
        set(ref(dataBase, `users/${id}/name`), name);
        set(ref(dataBase, `users/${id}/avatar`), avatar);
    };

    // const setImageUrl = (e) => {
    //     // setAvatarImageUrl(avatar)
    //     console.log(e)
    // }

    const validate = (e) => {
        console.log(e);
    };

    const [avatarImageUrl, setAvatarImageUrl] = React.useState('');

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
                    render={({handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <div className={s.name}>
                                <Field
                                    name="name"
                                    render={({input}) => (
                                        <div>
                                            <label className={s.text}>Имя:</label>
                                            <Input {...input} autoComplete='new-password' placeholder='Введите имя...'/>
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
                                                {true ? <FontAwesomeIcon icon={faUser} className={s.userIcon}/> : <img src={avatarImageUrl} alt="аватар"/>}
                                            </span>
                                            <Button className={s.uploadButton}>Загрузить
                                                фото</Button>
                                            <Input {...input} autoComplete='new-password' placeholder='Введите url адрес изображения...' className={s.avatarImgInput}/>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className={s.avatar}>
                                <Field
                                    name="password"
                                    render={({input}) => (
                                        <div>
                                            <label className={s.text}>Пароль:</label>
                                            <Input {...input} autoComplete='new-password' placeholder='Введите пароль...' />
                                        </div>
                                    )}
                                />
                            </div>
                            <div className={s.avatar}>
                                <Field
                                    name="passwordComfirmation"
                                    render={({input}) => (
                                        <div>
                                            <label className={s.text}>Подтверждение пароля:</label>
                                            <Input {...input} autoComplete='new-password' placeholder='Повторите пароль...'/>
                                        </div>
                                    )}
                                />
                            </div>
                            <Button type="submit">Сохранить изменения</Button>
                        </form>
                    )}
                />
            </div>
        </div>
    );
};

export default ModalSettings;
