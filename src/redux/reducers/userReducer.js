export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_CURRENT_DIALOG = 'SET_CURRENT_DIALOG'
export const SET_SAVED_DIALOGS = 'SET_SAVED_DIALOGS'
export const SET_STARTED_ACTIVE_DIALOGS_ID = 'SET_STARTED_ACTIVE_DIALOGS_ID'

const initialState = {
    email: null,
    token: null,
    id: null,
    currentDialog: null,
    savedDialogsId: [],
    startedActiveDialogsId: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                email: action.payload.email,
                token: action.payload.token,
                id: action.payload.id,
                startedActiveDialogsId: action.payload.startedActiveDialogsId,
                savedDialogsId: action.payload.savedDialogsId,
                currentDialog: null
            }
        case REMOVE_USER:
            return {
                ...state,
                email: null,
                token: null,
                id: null,
                startedActiveDialogsId: null,
                savedDialogsId: null,
                currentDialog: null
            }
        case SET_SAVED_DIALOGS:
            return {
                ...state,
                savedDialogsId: action.payload,
            }
        case SET_STARTED_ACTIVE_DIALOGS_ID:
            return {
                ...state,
                startedActiveDialogsId: action.payload,
            }
        case SET_CURRENT_DIALOG:
            return {
                ...state,
                currentDialog: action.payload,
            }
    }
    return state
}

export default userReducer;