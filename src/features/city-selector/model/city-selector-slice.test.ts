import { DEFAULT_CITY } from '../../../shared/config/const';
import { changeCity, citySelectorReducer } from './city-selector-slice';

describe('Slice: citySelector', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { city: DEFAULT_CITY };

    const result = citySelectorReducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city with "changeCity" action', () => {
    const initialState = { city: DEFAULT_CITY };
    const newCity = 'Paris';

    const result = citySelectorReducer(initialState, changeCity(newCity));

    expect(result.city).toBe(newCity);
  });
});
