import { combineReducers } from 'redux';
import api from './ApiReducer';
import movies from './MoviesReducer';
import genres from './GenresReducer';
import filters from './FiltersReducer';
import general from './GeneralReducer';

const rootReducer = combineReducers({
	api,
	movies,
	genres, 
	filters,
	general
});

export default rootReducer;