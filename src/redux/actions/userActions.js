import {SET_USER, REMOVE_USER, AUTHORIZATION_ERROR, AUTHORIZATION_ERROR_WITH_SOCIAL, CLEAR_AUTH_ERROR} from '../reducers/userReducer'

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const removeUser = () => ({
    type: REMOVE_USER,
})

export const authError = () => ({
    type: AUTHORIZATION_ERROR
})

export const authErrorWithSocials = () => ({
    type: AUTHORIZATION_ERROR_WITH_SOCIAL
})

export const clearAuthError = () => ({
    type: CLEAR_AUTH_ERROR
})
