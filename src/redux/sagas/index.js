import { all } from 'redux-saga/effects'
import { loginFunctionWatcher } from './loginSaga'
import { resetPasswordWatcher } from './resetPasswordSaga'

function* rootWatcher() {
	yield all([loginFunctionWatcher(), resetPasswordWatcher()])
}

export default rootWatcher
