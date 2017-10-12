import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import apiMiddleware from '../middleware/api';
import DBMiddleware from '../middleware/db';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
	const middleware = [thunkMiddleware, apiMiddleware, DBMiddleware];
	const composeEnhancers = composeWithDevTools({realtime: true});

	const store = createStore(
		rootReducer,
		initialState,
		composeEnhancers(applyMiddleware(...middleware))
	);

	return store;
}