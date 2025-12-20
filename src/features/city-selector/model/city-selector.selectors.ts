import { RootState } from '../../../app/store';

export const selectCurrentCity = (state: RootState) => state.city.city;
