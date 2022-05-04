export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'

const initialState = {
    email: null,
    token: null,
    id: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                email: action.payload.email,
                token: action.payload.token,
                id: action.payload.id,
            }
        case REMOVE_USER:
            return {
                ...state,
                email: null,
                token: null,
                id: null,
            }
    }
    return state
}

export default userReducer;