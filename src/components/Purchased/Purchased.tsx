import Link from 'next/link';
import React from 'react';
import { Check } from 'react-feather';

interface IPurchasedProps {
  firstName: string;
}

const Purchased:React.FC<IPurchasedProps> = ({ firstName }) => {
  return (
    <div className="purchased">
        <div className="purchased__icon">
          <Check size={70} strokeWidth={3} />
        </div>
        <h1 className="purchased__message">{firstName}, Thank you for placing your order!</h1>
        <Link href="/">
          <a className="button purchased__button">Return to shop</a>
        </Link>
    </div>
  );
};

export default Purchased;