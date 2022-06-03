import {
    SET_USER,
    REMOVE_USER,
    SET_CURRENT_DIALOG,
    SET_SAVED_DIALOGS,
    SET_STARTED_ACTIVE_DIALOGS_ID,
    SET_NAME_AVATAR
} from '../reducers/userReducer'

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const removeUser = () => ({
    type: REMOVE_USER,
})

export const setCurrentDialog = (dialogId) => ({
    type: SET_CURRENT_DIALOG,
    payload: dialogId
})

export const setSavedDialogs = (dialogsId) => ({
    type: SET_SAVED_DIALOGS,
    payload: dialogsId
})

export const setStartedActiveDialogsId = (dialogsId) => ({
    type: SET_STARTED_ACTIVE_DIALOGS_ID,
    payload: dialogsId
})

export const setNameAvatar = (payload) => ({
    type: SET_NAME_AVATAR,
    payload: payload
})
