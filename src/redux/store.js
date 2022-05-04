import {createStore, compose} from 'redux'
import rootReducer from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer)

export default store;