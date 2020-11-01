import React from 'react';
import Link from 'next/link';

import ActiveLink from '../ActiveLink/ActiveLink';
import NavCartIndicator from '../NavCartIndicator/NavCartIndicator';

const Navigation:React.FC = () => {
  return (
    <div className="navigation__wrap">
      <div className="navigation">
        <Link href="/">
          <a className="navigation__logo">Decor store</a>
        </Link>
        <div className="navigation__bg"></div>
        <nav className="navigation__content">
          <ActiveLink activeClassName="navigation__link_active" href="/">
            <a>Home</a>
          </ActiveLink>
          <NavCartIndicator />
        </nav>
      </div>
    </div>
  );
};

export default Navigation;