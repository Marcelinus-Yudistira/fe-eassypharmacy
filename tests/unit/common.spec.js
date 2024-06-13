import { currencyFormat } from '../../src/common.js';

describe('currencyFormat', () => {
    it('returns correct currency format with Rp', () => {
      expect(currencyFormat(10000)).toBe('Rp. 10.000,00');
    });
  
    it('returns correct currency format without Rp', () => {
      expect(currencyFormat(10000, false)).toBe('10.000,00');
    });
  
    it('returns default currency format for non-number input', () => {
      expect(currencyFormat('not a number')).toBe('Rp. 0,00');
    });
  });
  