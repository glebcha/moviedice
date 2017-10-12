import { 
	API_FETCH, 
	API_URL,
	FETCHING_API_CONFIG, 
	FETCHED_API_CONFIG, 
	API_CONFIG_FETCH_ERROR 
} from '../constants/api';
import API_KEY from '../constants/api_key';

export function fetchApiConfig() {
	return {
		type: API_FETCH,
		payload: {
			url: `${API_URL}/configuration?api_key=${API_KEY}`,
			actionTypes: {
				load: FETCHING_API_CONFIG,
				loaded: FETCHED_API_CONFIG,
				error: API_CONFIG_FETCH_ERROR
			}
		} 
	};
}