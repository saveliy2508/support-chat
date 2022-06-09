export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_CURRENT_DIALOG = 'SET_CURRENT_DIALOG'
export const SET_SAVED_DIALOGS = 'SET_SAVED_DIALOGS'
export const SET_STARTED_ACTIVE_DIALOGS_ID = 'SET_STARTED_ACTIVE_DIALOGS_ID'
export const SET_PROFILE_SETTINGS = 'SET_PROFILE_SETTINGS'
export const SET_DIALOGS_SETTINGS = 'SET_DIALOGS_SETTINGS'
export const SET_AUTO_GREETING = 'SET_AUTO_GREETING'

const initialState = {
	email: null,
	token: null,
	id: null,
	name: null,
	avatar: null,
	currentDialog: null,
	templatePhrases: [],
	autoGreeting: '',
	savedDialogsId: [],
	startedActiveDialogsId: []
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				email: action.payload.email,
				token: action.payload.token,
				id: action.payload.id,
				name: action.payload.name,
				avatar: action.payload.avatar,
				templatePhrases: action.payload.templatePhrases,
				autoGreeting: action.payload.autoGreeting,
				startedActiveDialogsId: action.payload.startedActiveDialogsId,
				savedDialogsId: action.payload.savedDialogsId,
				currentDialog: null
			}
		case REMOVE_USER:
			return {
				...state,
				email: null,
				token: null,
				id: null,
				name: null,
				avatar: null,
				templatePhrases: null,
				autoGreeting: null,
				startedActiveDialogsId: null,
				savedDialogsId: null,
				currentDialog: null
			}
		case SET_SAVED_DIALOGS:
			return {
				...state,
				savedDialogsId: action.payload
			}
		case SET_STARTED_ACTIVE_DIALOGS_ID:
			return {
				...state,
				startedActiveDialogsId: action.payload
			}
		case SET_CURRENT_DIALOG:
			return {
				...state,
				currentDialog: action.payload
			}
		case SET_PROFILE_SETTINGS:
			return {
				...state,
				name: action.payload.name,
				avatar: action.payload.avatar
			}
		case SET_DIALOGS_SETTINGS:
			return {
				...state,
				autoGreeting: action.payload.autoGreeting,
				templatePhrases: action.payload.templatePhrases
			}
		case SET_AUTO_GREETING:
			return {
				...state,
				autoGreeting: action.payload
			}
	}
	return state
}

export default userReducer