import {SET_USER_DATA} from '../reducers/dataReducer'

export const setUserData = (data) => ({
    type: SET_USER_DATA,
    payload: data
})
