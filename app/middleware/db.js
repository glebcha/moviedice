import { AsyncStorage } from 'react-native';
import { 
	GET_ITEM,
	SET_ITEM, 
	GET_ALL_ITEMS,
	REMOVE_ITEMS
} from '../constants/db';

const createDBMiddleware =  store => next => action => {
	const {type, payload = {}} = action;

	if (type === GET_ITEM) {
		return AsyncStorage.getItem(payload.id);
	}
	else if (type === SET_ITEM) {
		return AsyncStorage.setItem(
			payload.id, 
			payload.body
		);
	}
	else if (type === REMOVE_ITEMS) {
		return AsyncStorage.multiRemove(payload.id.split(','));
	}
	else if (type === GET_ALL_ITEMS) {
		return AsyncStorage.getAllKeys();
	}
	
	return next(action);
};

export default createDBMiddleware;