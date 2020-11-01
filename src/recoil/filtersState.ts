import { atom } from 'recoil';

interface IFiltersState {
  category: string;
  priceFrom: number,
  priceTo: number,
  colors: string[]
}

export const filtersState = atom<IFiltersState>({
  key: "filtersState",
  default: {
    category: null,
    priceFrom: null,
    priceTo: null,
    colors: []
  }
});