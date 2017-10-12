import {LAYOUT_CHANGED, PASSED_INTRO} from '../constants/general';

const initialState = {
	orientation: null,
	intro: {
		passed: false
	}
};

export default function general(state = initialState, action) {
	/*eslint-disable */
	switch (action.type) {

		case LAYOUT_CHANGED:
			const {orientation} = action.payload;
			
			return {...state, orientation}
		
		case PASSED_INTRO:
			const passedIntro = {...state.intro};

			passedIntro.passed = action.payload;
			
			return {...state, intro: passedIntro}

		default:
			return state
	}
	/*eslint-enable */
}