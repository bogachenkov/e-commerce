import { atom } from 'recoil';

export const imgObserver = atom<IntersectionObserver>({
  key: 'imgObserver',
  default: null
})