export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR'

const initialState = {
    email: null,
    token: null,
    id: null,
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
            return{
                ...state,
                errorMessage: 'Неверная почта или пароль'
            }
        case REMOVE_USER:
            return {
                ...state,
                email: null,
                token: null,
                id: null,
                errorMessage: ''
            }
    }
    return state
}

export default userReducer;