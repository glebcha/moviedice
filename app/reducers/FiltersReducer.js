import {SAVE_FILTERS} from '../constants/filters';

const initialState = {
	genres: [],
	lang: {
		locale: 'en-US',
		country: 'US'
	},
	rating: 5.5,
	votes: 1
};

export default function general(state = initialState, action) {
	/*eslint-disable */
	switch (action.type) {

		case SAVE_FILTERS:
			const {payload} = action;
			
			return {...state, ...payload}
			
		default:
			return state
	}
	/*eslint-enable */
}