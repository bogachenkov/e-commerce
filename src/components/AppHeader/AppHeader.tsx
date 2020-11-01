import React from 'react';

const AppHeader:React.FC = () => {
  return (
    <header className="app-header">
      <div className="app-header__title">
        <h1>Home <br/> Decor Store</h1>
        <p>Discover our amazing home and furniture range. Stylish, high quality furniture, bedding, rugs, lighting and more at affordable prices.</p>
      </div>
      <div className="app-header__image">
        <img src="/images/ui/header.png" alt=""/>
      </div>
      <div className="app-header__product">
        <h2>Desk Lamp</h2>
        <p>Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Etiam rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus accumsan cursus velit.</p>
      </div>
    </header>
  );
};

export default AppHeader;