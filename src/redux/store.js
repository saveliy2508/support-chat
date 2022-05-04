import rootReducer from "./reducers";
import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'
import rootWatcher from "./sagas";
import {composeWithDevTools} from 'redux-devtools-extension'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootWatcher)

export default store;