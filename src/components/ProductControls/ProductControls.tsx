import React from 'react';
import SortBy from '../SortBy/SortBy';

interface IProductControlsProps {
  itemsQty: number;
}

const ProductControls:React.FC<IProductControlsProps> = ({ itemsQty }) => {
  return (
    <div className="product-controls">
      <h2 className="app-h2">
        <SortBy />
      </h2>
      <p className="product-controls__itemsQty">{itemsQty} items</p>
    </div>
  );
};

export default ProductControls;