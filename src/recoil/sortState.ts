import { atom, selector } from 'recoil';

export const sortState = atom({
  key: 'sortState',
  default: 'asc_name'
});

export const sortAndOrder = selector({
  key: 'sortAndOrder',
  get: ({ get }) => {
    const sorting = get(sortState);
    const [ order, sortBy ] = sorting.split('_');
    return {
      sortBy,
      order
    }
  }
});