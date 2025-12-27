import { RootState } from '../../../app/store';
import { selectCurrentCity } from './city-selector.selectors';

describe('Selectors: CitySelector', () => {
  it('should return current city from state', () => {
    const mockState = {
      city: {
        city: 'Paris',
      },
    } as RootState;

    const result = selectCurrentCity(mockState);

    expect(result).toBe('Paris');
  });

  it('should return undefined or default if state is empty (edge case)', () => {
    const emptyState = {
      city: {},
    } as RootState;

    const result = selectCurrentCity(emptyState);

    expect(result).toBeUndefined();
  });
});
