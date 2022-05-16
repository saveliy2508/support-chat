export const LOG_IN_ERROR = 'LOG_IN_ERROR'
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'
export const AUTHORIZATION_ERROR_WITH_SOCIAL = 'AUTHORIZATION_ERROR_WITH_SOCIAL'
export const CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR'

const initialState = {
    logInErrorMessage: '',
    signUpErrorMessage: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_ERROR:
            return {
                ...state,
                logInErrorMessage: 'Неверная почта или пароль'
            }
        case SIGN_UP_ERROR:
            return {
                ...state,
                signUpErrorMessage: 'Ошибка регистрации'
            }
        case AUTHORIZATION_ERROR_WITH_SOCIAL:
            return {
                ...state,
                logInErrorMessage: 'Ошибка входа через социальные сети',
                signUpErrorMessage: 'Ошибка входа через социальные сети'
            }
        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                logInErrorMessage: '',
                signUpErrorMessage: ''
            }
    }
    return state
}

export default userReducer;