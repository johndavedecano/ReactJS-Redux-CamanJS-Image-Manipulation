import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);
export default function configureStore(initialState) {
	return createStoreWithMiddleware(rootReducer, initialState);
}