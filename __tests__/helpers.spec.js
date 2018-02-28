import { getLocale, collectionsDiff, isFunction } from '../app/utils/helpers';

describe('Helper functions', () => {
	it('should return locales', () => {
		const eng = getLocale('US');
  
		expect(eng).toHaveLength(2);
	});

	it('should check correctly if it is function', () => {
		const obj = isFunction({});
		const func = isFunction(() => {});
  
		expect(obj).toBe(false);
		expect(func).toBe(true);
	});

	it('should return correct diff for two collections', () => {
		const first = [{id: 1}, {id: 2}, {id: 4}];
		const second = [{id: 3}];
		const result = collectionsDiff(first, second);
		
		expect(result.deleted).toHaveLength(1);
	});

	it('should return empty/partial diff for corrupted data', () => {
		const first = [{id: 1}, {id: 2}, {id: 4}];
		const second = [[{id: 3}]];
		const result = collectionsDiff(first, second);

		expect(result.added).toHaveLength(3);
	});
});