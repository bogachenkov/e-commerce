import React from 'react';
import Head from 'next/head';
import Modal from 'react-modal';

import { useRecoilValue } from 'recoil';
import { totalPriceWithProducts } from 'src/recoil';

import CheckoutForm from 'src/components/CheckoutForm/CheckoutForm';
import ShoppingCart from 'src/components/ShoppingCart/ShoppingCart';
import EmptyCart from 'src/components/EmptyCart/EmptyCart';

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#__next');

const CheckoutPage:React.FC = () => {
  const { products, totalPrice } = useRecoilValue(totalPriceWithProducts);

  if (products.length === 0) return <EmptyCart />

  return (
    <div className="checkout-page">
      <Head>
        <title>Checkout Page - Current total is ${totalPrice}</title>
      </Head>
      <CheckoutForm />
      <ShoppingCart products={products} totalPrice={totalPrice} />
    </div>
  );
};

export default CheckoutPage;