export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR'
export const AUTHORIZATION_ERROR_WITH_SOCIAL = 'AUTHORIZATION_ERROR_WITH_SOCIAL'
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR'
export const SET_CURRENT_DIALOG = 'SET_CURRENT_DIALOG'

const initialState = {
    email: null,
    token: null,
    id: null,
    currentDialog: null,
    errorMessage: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                email: action.payload.email,
                token: action.payload.token,
                id: action.payload.id,
                errorMessage: ''
            }
        case AUTHORIZATION_ERROR:
            return {
                ...state,
                errorMessage: 'Неверная почта или пароль'
            }
        case AUTHORIZATION_ERROR_WITH_SOCIAL:
            return {
                ...state,
                errorMessage: 'Ошибка входа'
            }
        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                errorMessage: ''
            }
        case REMOVE_USER:
            return {
                ...state,
                email: null,
                token: null,
                id: null,
                errorMessage: ''
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