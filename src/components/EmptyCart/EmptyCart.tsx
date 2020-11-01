import Link from 'next/link';
import React from 'react';

const EmptyCart:React.FC = () => {
  return (
    <div className="empty-cart">
      <img src="/images/ui/empty-cart.png" alt="Your cart is empty" className="empty-cart__image"/>
      <h1 className="empty-cart__message">Your cart is currently empty!</h1>
      <Link href="/">
        <a className="button empty-cart__button">
          Return to shop
        </a>
      </Link>
    </div>
  );
};

export default EmptyCart;