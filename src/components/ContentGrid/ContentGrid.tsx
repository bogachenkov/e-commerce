import React from 'react';
import Filters from '../Filters/Filters';
import Products from '../Products/Products';

const ContentGrid:React.FC = () => {
  return (
    <div className="content-grid">
      <Filters />
      <Products />
    </div>
  );
};

export default ContentGrid;