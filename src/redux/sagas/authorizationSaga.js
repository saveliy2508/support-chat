import {put, takeLatest, call} from 'redux-saga/effects'
import {setUser} from "../actions/userActions";
import {SET_USER} from "../reducers/userReducer";


// const authorizationFromApi =()=> fetch('https://jsonplaceholder.typicode.com/users')

function* authorizationWorker () {
    // const data = yield call(authorizationFromApi)
    // const json = yield(data.data)
    // yield put(setUser(json))
}

export function* authorizationWatcher(){
    // yield takeLatest(SET_USER, authorizationWorker)
}