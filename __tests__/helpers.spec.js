import { getLocale, isFunction } from '../app/utils/helpers';

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
});