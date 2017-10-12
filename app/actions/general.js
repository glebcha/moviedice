import {LAYOUT_CHANGED} from '../constants/general';

export function changedOrientation(orientation) {
	return {
		type: LAYOUT_CHANGED,
		payload: {orientation} 
	};
}