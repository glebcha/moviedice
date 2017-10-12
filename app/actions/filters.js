import {SAVE_FILTERS} from '../constants/filters';

export function saveFilters(filters) {
	return {
		type: SAVE_FILTERS,
		payload: filters
	};
}