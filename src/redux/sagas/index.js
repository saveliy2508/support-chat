import {all} from 'redux-saga/effects'
import {authorizationWatcher} from "./../sagas/authorizationSaga";

function* rootWatcher() {
    yield all([authorizationWatcher()])
}

export default rootWatcher;