import { 
	FETCHING_GENRES,
	FETCHED_GENRES,
	GENRES_FETCH_ERROR 
} from '../constants/movies';

const initialState = {
	isFetching: false,
	items: [],
	error: null
};

export default function genres(state = initialState, action) {
	/*eslint-disable */
	switch (action.type) {

		case FETCHING_GENRES:
			return {
				...state,
				isFetching: true
			}


		case FETCHED_GENRES: {
			const {genres} = action.payload;

			return {
				...state,
				items: genres,
				isFetching: false,
				error: null
			}
		}

		case GENRES_FETCH_ERROR:
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