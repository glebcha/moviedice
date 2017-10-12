import _ from 'lodash';
import { 
	FETCHING_MOVIES, 
	FETCHED_MOVIES, 
	MOVIES_FETCH_ERROR,
	FETCHING_SIMILAR_MOVIES,
	FETCHED_SIMILAR_MOVIES,
	SIMILAR_MOVIES_FETCH_ERROR,
	ADD_FAVORITE_MOVIE,
	REMOVE_FAVORITE_MOVIE,
	SAVE_FAVORITES 
} from '../constants/movies';

const initialState = {
	isFetching: true,
	items: [],
	favorites: [],
	error: null
};

export default function movies(state = initialState, action) {
	/*eslint-disable */
	switch (action.type) {

		case FETCHING_MOVIES:
		case FETCHING_SIMILAR_MOVIES:
			return {
				...state,
				isFetching: true
			}


		case FETCHED_MOVIES:
		case FETCHED_SIMILAR_MOVIES: 
			const {
				results, 
				page, 
				total_results, 
				total_pages
			} = action.payload;

			return {
				...state,
				items: results,
				optional: {
					page, 
					total_results, 
					total_pages
				},
				isFetching: false,
				error: null
			}

		case MOVIES_FETCH_ERROR:
		case SIMILAR_MOVIES_FETCH_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.error
			}

		case SAVE_FAVORITES:
			return {
				...state,
				favorites: action.payload
			}

		case ADD_FAVORITE_MOVIE:
			const initialAdded = state.favorites; 
			const added = [...initialAdded];
			
			added.push(action.payload.item);

			return {
				...state, 
				favorites: added
			}
		
		case REMOVE_FAVORITE_MOVIE:
			const initialRemoved = state.favorites; 
			const removed = [...initialRemoved];
			const indexToRemove = _.findIndex(removed, {id: action.payload.item.id});

			removed.splice(indexToRemove, 1);

			return {
				...state, 
				favorites: removed
			}
			
		default:
			return state
	}
	/*eslint-enable */
}