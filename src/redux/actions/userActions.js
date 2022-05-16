import {SET_USER, REMOVE_USER, SET_CURRENT_DIALOG, SET_SAVED_DIALOGS} from '../reducers/userReducer'

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