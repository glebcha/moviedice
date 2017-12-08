// @flow
import codes from './countryCodes';

type optionsType = {
	id: string,
	type: string, 
	payload?: boolean | {
		items: Array<any>,
		error: boolean,
		isFetching: boolean
	}, 
	fetcher?: () => {
		type: string,
		payload: {
			url: string,
			actionTypes: {
				load: string,
				loaded: string,
				error: string
			}
		} 
	}, 
	dispatch: (arg: any) => Promise<any>
}

export function checkDBConfig(options: optionsType) {
	const {
		id, 
		type, 
		payload, 
		fetcher, 
		dispatch
	} = options;
	
	return dispatch({
		type: 'GET_ITEM', 
		payload: {id}
	})
	.then((result?: string) => {
		if (!result) {
			if (fetcher) {
				return dispatch(fetcher());
			} else {
				return {type, payload};
			}
		} else {
			return dispatch({type, payload: JSON.parse(result)});
		}
	})
	.then(config => {
		if (config.type && config.type === type) {
			return dispatch({
				type: 'SET_ITEM', 
				payload: {id, body: JSON.stringify(config.payload)}
			});
		} else {
			return config;
		}
	});

}

export function isFunction(func: any) {
	return func && Object.prototype.toString.call(func) === '[object Function]';
}

export function isArray(arr: any) {
	return arr && Object.prototype.toString.call(arr) === '[object Array]';
}

export function isObject(obj: any) {
	return obj && Object.prototype.toString.call(obj) === '[object Object]';
}

export function getLocale(country: string) {
	const locales = codes.filter((code: string) => {
		const splitted = code.split('-');
		const countryCode = splitted[splitted.length - 1].replace(/\s/, '');

		if (countryCode === country) {
			return code;
		}
	});

	return locales;
}

export function collectionsDiff(
	first: Array<any>, 
	second: Array<any>, 
	options: {
		predicate: string,
		added: boolean,
		deleted: boolean
	} = {predicate: 'id', added: true, deleted: true}
) {
	const {predicate, added, deleted} = options;
	const result = {
		added: [],
		deleted: []
	};

	if (!isArray(first) || !isArray(second)) {
		return result;
	}

	if (added) {
		first.forEach(file => {
			if (!isObject(file)) {
				return result;
			} 

			const existing = second.filter(state => state[predicate] === file[predicate]);
			
			if (existing.length === 0) {
				result.added.push(file);
			}
		});
	}
	
	if (deleted) {
		second.forEach(state => {
			if (!isObject(state)) {
				return result;
			} 

			const existing = first.filter(file => file[predicate] === state[predicate]);
			
			if (existing.length === 0) {
				result.deleted.push(state);
			}
		});
	}

	return result;
}