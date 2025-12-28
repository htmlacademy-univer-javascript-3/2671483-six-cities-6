import { describe, expect, it } from 'vitest';
import { ALL_CITIES } from '../config/const';
import { AppRoute } from '../config/route';
import type { Offers } from '../types/offer.type';
import { getLimitedPoints, getOfferPath, getRandomCity } from './utils';

describe('Utils: getOfferPath', () => {
  it('should return correct path with string id', () => {
    const id = '123';
    const expectedPath = AppRoute.Offer.replace(':offerId', id);
    expect(getOfferPath(id)).toBe(expectedPath);
  });

  it('should return correct path with number id', () => {
    const id = 456;
    const expectedPath = AppRoute.Offer.replace(':offerId', String(id));
    expect(getOfferPath(id)).toBe(expectedPath);
  });
});

describe('Utils: getLimitedPoints', () => {
  const mockPoints = [{ id: '1' }, { id: '2' }, { id: '3' }] as Offers;

  it('should return first N points according to limit', () => {
    const limit = 2;
    const result = getLimitedPoints(limit, mockPoints);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('1');
    expect(result[1].id).toBe('2');
  });

  it('should return empty array if limit is 0', () => {
    const result = getLimitedPoints(0, mockPoints);
    expect(result).toHaveLength(0);
  });

  it('should return empty array if limit is negative', () => {
    const result = getLimitedPoints(-5, mockPoints);
    expect(result).toHaveLength(0);
  });

  it('should return all points if limit is greater than length', () => {
    const result = getLimitedPoints(10, mockPoints);
    expect(result).toHaveLength(3);
  });
});

describe('Utils: getRandomCity', () => {
  it('should return a city from ALL_CITIES list', () => {
    const city = getRandomCity();
    expect(ALL_CITIES).toContain(city);
  });

  it('should return a string', () => {
    const city = getRandomCity();
    expect(typeof city).toBe('string');
  });
});
