import { 
	API_FETCH,
	API_FETCHING, 
	API_FETCHED, 
	API_FETCH_ERROR 
} from '../constants/api';

const createApiMiddleware =  store => next => action => {
	const {dispatch} = store;
	const {type, payload} = action;

	const defaultOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const defaultActionTypes = {
		load: API_FETCHING,
		loaded: API_FETCHED,
		error: API_FETCH_ERROR
	};

	if (type !== API_FETCH) {
		return next(action);
	}

	const {
		url,
		handlers = {}, 
		options = defaultOptions,
		actionTypes = defaultActionTypes
	} = payload;

	dispatch({type: actionTypes.load});
	/*eslint-disable */
	return fetch(url, options)
	.then(res => {
		const {text, formData, blob, arrayBuffer} = options;
		let data = res.json();

		if (text) {
			data = res.text();
		}
		else if (blob) {
			data = res.blob()
		}
		else if (formData) {
			data = res.formData();
		}
		else if (arrayBuffer) {
			data = res.arrayBuffer();
		}

		return data;
	})
	.then(data => dispatch({
		type: actionTypes.loaded, 
		payload: handlers.success ? handlers.success(data) : data
	}))
	.catch(err => dispatch({
		type: actionTypes.error,
		payload: handlers.error ? handlers.error(err) : err
	}))
	/*eslint-enable */
};

export default createApiMiddleware;