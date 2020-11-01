import Link from 'next/link';
import React, { useCallback } from 'react';

import { useSetRecoilState } from 'recoil';
import { shoppingCartState, IShoppingCartProduct } from 'src/recoil';

interface IShoppingCartProps {
  products: IShoppingCartProduct[],
  totalPrice: number;
}

const ShoppingCart:React.FC<IShoppingCartProps> = ({ products, totalPrice }) => {
  const setCartState = useSetRecoilState(shoppingCartState);

  const removeItemFromCart = useCallback((id: string) => {
    setCartState(state => state.filter(p => p.id !== id));
  }, []);

  return (
    <aside className="shopping-cart">
      <div className="shopping-cart__content">
        <h2 className="shopping-cart__heading">
          Shopping Cart
        </h2>
        <div className="shopping-cart__products">
          {
            products.map(product => (
              <div key={product.id} className="shopping-cart__product">
                <img className="shopping-cart__product-image" src={`/images/products/small/${product.image}`} alt={product.name} />
                <Link href={`/products/${product.slug}`}>
                  <a className="shopping-cart__product-name">{ product.name }</a>
                </Link>
                <p className="shopping-cart__product-price">{ product.price }$</p>
                <button onClick={() => removeItemFromCart(product.id)} className="shopping-cart__product-remove">
                  Remove
                </button>
              </div>
            ))
          }
        </div>
        <div className="shopping-cart__price">
          <p className="shopping-cart__price-item">
            Subtotal
            <span>${totalPrice}</span>
          </p>
          <p className="shopping-cart__price-item">
            Shipping
            <span>Free</span>
          </p>
        </div>
        <p className="shopping-cart__total-price">
          Total
          <span>${totalPrice}</span>
        </p>
      </div>
    </aside>
  );
};

export default ShoppingCart;