import rootReducer from './reducers'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootWatcher from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
)
export const persistor = persistStore(store)

sagaMiddleware.run(rootWatcher)