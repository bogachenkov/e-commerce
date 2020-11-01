import React from 'react';

import { useRecoilValue } from 'recoil';
import { shoppingCartState } from 'src/recoil';

import ActiveLink from '../ActiveLink/ActiveLink';

const NavCartIndicator:React.FC = () => {
  const products = useRecoilValue(shoppingCartState);
  return (
    <ActiveLink activeClassName="navigation__link_active" href="/checkout">
      <a>
        My Cart ({products.length})
      </a>
    </ActiveLink>
  );
};

export default NavCartIndicator;