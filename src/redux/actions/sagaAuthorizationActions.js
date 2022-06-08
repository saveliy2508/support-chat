import { LOGIN_SAGA } from '../sagas/loginSaga'
import { RESET_PASSWORD_SAGA } from '../sagas/resetPasswordSaga'

export const loginSaga = (payload) => ({
	type: LOGIN_SAGA,
	response: payload
})

export const resetPasswordSaga = (email) => ({
	type: RESET_PASSWORD_SAGA,
	email: email
})
