export const SET_USER_DATA = 'SET_USER_DATA'
export const SET_NEW_DIALOGS = 'SET_NEW_DIALOGS'
export const SET_ACTIVE_DIALOGS = 'SET_ACTIVE_DIALOGS'

const initialState = {
    email: null,
    id: null,
    newDialogs: null,
    activeDialogs: null,
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                email: action.payload.email,
                id: action.payload.id,
                newDialogs: action.payload.activeDialogs,
            }
        case SET_NEW_DIALOGS:
            return {
                ...state,
                newDialogs: action.payload
            }
        case SET_ACTIVE_DIALOGS:
            return {
                ...state,
                activeDialogs: action.payload
            }
    }
    return state
}

export default dataReducer;