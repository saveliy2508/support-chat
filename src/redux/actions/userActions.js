import {SET_USER, REMOVE_USER} from './../reducers/userReducer'

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

export const removeUser = () => ({
    type: REMOVE_USER,
})