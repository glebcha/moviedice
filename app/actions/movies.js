import { API_FETCH, API_URL } from '../constants/api';
import { 
	FETCHING_MOVIES, 
	FETCHED_MOVIES, 
	MOVIES_FETCH_ERROR,
	FETCHING_SIMILAR_MOVIES,
	FETCHED_SIMILAR_MOVIES,
	SIMILAR_MOVIES_FETCH_ERROR,
	FETCHING_GENRES,
	FETCHED_GENRES,
	GENRES_FETCH_ERROR,
	ADD_FAVORITE_MOVIE,
	REMOVE_FAVORITE_MOVIE,
	SAVE_FAVORITES 
} from '../constants/movies';
import API_KEY from '../constants/api_key';

export function saveFavorites(payload) {
	return {
		type: SAVE_FAVORITES,
		payload
	};
}

export function addFavoriteMovie(item) {
	return {
		type: ADD_FAVORITE_MOVIE,
		payload: {item}
	};
}

export function removeFavoriteMovie(item) {
	return {
		type: REMOVE_FAVORITE_MOVIE,
		payload: {item}
	};
}

export function fetchMovies(params) {
	return {
		type: API_FETCH,
		payload: {
			url: `${API_URL}/discover/movie?api_key=${API_KEY}&${params}`,
			actionTypes: {
				load: FETCHING_MOVIES,
				loaded: FETCHED_MOVIES,
				error: MOVIES_FETCH_ERROR
			}
		} 
	};
}

export function fetchGenres(params) {
	return {
		type: API_FETCH,
		payload: {
			url: `${API_URL}/genre/movie/list?api_key=${API_KEY}&${params}`,
			actionTypes: {
				load: FETCHING_GENRES,
				loaded: FETCHED_GENRES,
				error: GENRES_FETCH_ERROR
			}
		} 
	};
}

export function fetchSimilarMovies(movieId, params) {
	return {
		type: API_FETCH,
		payload: {
			url: `${API_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&${params}`,
			actionTypes: {
				load: FETCHING_SIMILAR_MOVIES,
				loaded: FETCHED_SIMILAR_MOVIES,
				error: SIMILAR_MOVIES_FETCH_ERROR
			}
		} 
	};
}