import { 
	FETCHING_API_CONFIG, 
	FETCHED_API_CONFIG, 
	API_CONFIG_FETCH_ERROR 
} from '../constants/api';

const initialState = {
	isFetching: false,
	item: {},
	error: null
};

export default function api(state = initialState, action) {
	/*eslint-disable */
	switch (action.type) {

		case FETCHING_API_CONFIG:
			return {
				...state,
				isFetching: true
			}


		case FETCHED_API_CONFIG: {
			return {
				...state,
				item: action.payload,
				isFetching: false,
				error: null
			}
		}

		case API_CONFIG_FETCH_ERROR :
			return {
				...state,
				isFetching: false,
				error: action.error
			}
			
		default:
			return state
	}
	/*eslint-enable */
}