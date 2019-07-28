import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
	key: 'S3Corp.com.vn',
	storage: storage,
	blacklist: ['course']
}

const persistedReducer = persistReducer(persistConfig, reducers)


const store = createStore(persistedReducer, compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
))

export default () => {
	const persistor = persistStore(store)
	return { store, persistor }
}
