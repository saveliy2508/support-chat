export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_CURRENT_DIALOG = 'SET_CURRENT_DIALOG'
export const SET_SAVED_DIALOGS = 'SET_SAVED_DIALOGS'

const initialState = {
    email: null,
    token: null,
    id: null,
    currentDialog: null,
    savedDialogsId: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                email: action.payload.email,
                token: action.payload.token,
                id: action.payload.id,
                savedDialogsId: action.payload.savedDialogsId,
                errorMessage: ''
            }
        case REMOVE_USER:
            return {
                ...state,
                email: null,
                token: null,
                id: null,
                savedDialogsId: null,
                currentDialog: null
            }
        case SET_SAVED_DIALOGS:
            return {
                ...state,
                savedDialogsId: action.payload,
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