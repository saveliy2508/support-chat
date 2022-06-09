import {
	SET_USER_DATA,
	SET_NEW_DIALOGS,
	SET_ACTIVE_DIALOGS,
	REMOVE_DATA
} from '../reducers/dataReducer'

export const setUserData = (data) => ({
	type: SET_USER_DATA,
	payload: data
})

export const setNewDialogs = (newDialogs) => ({
	type: SET_NEW_DIALOGS,
	payload: newDialogs
})

export const setActiveDialogs = (activeDialogs) => ({
	type: SET_ACTIVE_DIALOGS,
	payload: activeDialogs
})

export const removeData = () => ({
	type: REMOVE_DATA
})