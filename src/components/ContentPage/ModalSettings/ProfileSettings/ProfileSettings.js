import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Form, Field} from "react-final-form";
import {Input, Button} from "reactstrap";
import {get, ref, set} from "firebase/database";
import {auth, dataBase} from "../../../../firebase";
import {useDispatch, useSelector} from "react-redux";

import s from "./profileSettings.module.scss";


import {setProfileSettings} from "../../../../redux/actions/userActions";
import {sendPasswordResetEmail} from "firebase/auth";
import {toast, ToastContainer} from "react-toastify";

const ProfileSettings = ({setIsOpenModal}) => {
    const notify = (text) => toast.info(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const {id, name, avatar, email} = useSelector(state => state.user)

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

                dispatch(setProfileSettings({
                    name: name,
                    avatar: avatar,
                }))
                setIsOpenModal(false)
            });
    };

    const [currentAvatarInput, setCurrentAvatarInput] = React.useState(avatar);

    const validate = (e) => {
        setCurrentAvatarInput(e.avatar)
    };

    const handleResetPassword = async () => {
        await sendPasswordResetEmail(auth, email)
            .then(() => {
                notify('Проверьте вашу почту')
            }).catch(() => notify('Ошибка'))
    }

    const initialData = {name: name, avatar: currentAvatarInput}
    return (
        <div className={s.modal}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
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
                    <Button type="submit" onClick={handleResetPassword}>Отправить письмо на почту</Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
