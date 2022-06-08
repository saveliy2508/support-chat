import {
	AUTHORIZATION_ERROR_WITH_SOCIAL,
	CLEAR_AUTH_ERROR,
	LOG_IN_ERROR,
	SIGN_UP_ERROR
} from '../reducers/authErrorReducer'

export const logInError = () => ({
	type: LOG_IN_ERROR
})

export const signUpError = () => ({
	type: SIGN_UP_ERROR
})

export const authErrorWithSocials = () => ({
	type: AUTHORIZATION_ERROR_WITH_SOCIAL
})

export const clearError = () => ({
	type: CLEAR_AUTH_ERROR
})