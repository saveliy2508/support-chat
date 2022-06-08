import {
    SET_USER,
    REMOVE_USER,
    SET_CURRENT_DIALOG,
    SET_SAVED_DIALOGS,
    SET_STARTED_ACTIVE_DIALOGS_ID,
    SET_PROFILE_SETTINGS, SET_DIALOGS_SETTINGS, SET_AUTO_GREETING
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

export const setProfileSettings = (payload) => ({
    type: SET_PROFILE_SETTINGS,
    payload: payload
})

export const setDialogsSettings = (payload) => ({
    type: SET_DIALOGS_SETTINGS,
    payload: payload
})

export const setAutoGreening = (payload) => ({
    type: SET_AUTO_GREETING,
    payload: payload
})
