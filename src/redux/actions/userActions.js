import {SET_USER, REMOVE_USER, AUTHORIZATION_ERROR} from '../reducers/userReducer'

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
