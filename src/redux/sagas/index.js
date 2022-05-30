import {all} from 'redux-saga/effects'
import {loginFunctionWatcher} from "./authorizationSaga";

function* rootWatcher() {
    yield all([loginFunctionWatcher()])
}

export default rootWatcher;