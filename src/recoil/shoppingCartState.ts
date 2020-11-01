import { atom, selector } from 'recoil';

export interface IShoppingCartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}
export const shoppingCartState = atom<IShoppingCartProduct[]>({
  key: 'shoppingCartState',
  default: []
});

export const totalPriceWithProducts = selector({
  key: 'totalPriceWithProducts',
  get: ({ get }) => {
    const products = get(shoppingCartState);
    const totalPrice = products.reduce((total, product) => total + product.price, 0);

    return {
      products,
      totalPrice
    }
  }
});