export const SET_USER_DATA = 'SET_USER_DATA'

const initialState = {
    email: null,
    id: null,
    dialogs: null,
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                email: action.payload.email,
                id: action.payload.id,
                dialogs: action.payload.dialogs,
            }
    }
    return state
}

export default dataReducer;