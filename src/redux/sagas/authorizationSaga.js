import {put, takeLatest} from 'redux-saga/effects'
import {setUser} from "../actions/userActions";
import {equalTo, get, orderByChild, query, ref, set} from "firebase/database";
import {dataBase} from "../../firebase";
import {setActiveDialogs, setNewDialogs} from "../actions/dataActions";


export function* loginFunctionWorker({response}) {
    const user = yield response.user;

    let name;
    let avatarImg;
    let templatePhrases;
    let autoGreeting;
    const userDataIdRef = yield ref(dataBase, `users/${user.uid}`);
    yield get(userDataIdRef).then(
        (snapshot) => {
            let data = snapshot.val();
            if (data.hasOwnProperty('name')) {
                name = data.name;
            }
            if (data.hasOwnProperty('avatar')) {
                avatarImg = data.avatar;
            }
            if (data.hasOwnProperty('templatePhrases')) {
                templatePhrases = Object.values(data.templatePhrases).map(item => item.text);
            }
            if (data.hasOwnProperty('autoGreeting')) {
                autoGreeting = data.autoGreeting;
            }
        });

    let savedDialogsId;
    const savedDialogsIdRef = yield ref(dataBase, `users/${user.uid}/savedDialogsId`);
    yield get(savedDialogsIdRef).then(
        (snapshot) => {
            savedDialogsId = snapshot.val();
        });

    let startedActiveDialogsId;
    const startedActiveDialogsRef = yield ref(dataBase, `users/${user.uid}/startedActiveDialogsId`);
    yield get(startedActiveDialogsRef).then(
        (snapshot) => {
            startedActiveDialogsId = snapshot.val();
        });

    yield put(setUser({
        email: user.email,
        id: user.uid,
        token: user.accessToken,
        name: name,
        avatar: avatarImg,
        templatePhrases: templatePhrases,
        autoGreeting: autoGreeting,
        savedDialogsId: savedDialogsId,
        startedActiveDialogsId: startedActiveDialogsId
    }))

    yield set(ref(dataBase, `users/${user.uid}/email`), user.email);
    yield set(ref(dataBase, `users/${user.uid}/id`), user.uid);

    const newDialogsRef = yield ref(dataBase, `newDialogs`);
    let newDialogs = [];
    yield get(newDialogsRef).then(
        (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val()
                newDialogs.push(data)
            })
        });
    yield put(setNewDialogs(newDialogs))

    const activeDialogsRef = yield query(ref(dataBase, 'activeDialogs'), orderByChild('operatorId'), equalTo(user.uid))
    let activeDialogs = [];
    yield get(activeDialogsRef).then(
        (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val()
                activeDialogs.push(data)
            })
        });
    yield put(setActiveDialogs(activeDialogs))
}

export function* loginFunctionWatcher() {
    yield takeLatest('LOGIN_SAGA', loginFunctionWorker)
}