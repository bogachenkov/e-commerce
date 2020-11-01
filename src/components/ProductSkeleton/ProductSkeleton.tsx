import React from 'react';
import { Star } from 'react-feather';

const ProductSkeleton:React.FC = () => {
  return (
    <div data-testid="product-skeleton" className="product-skeleton">
        <div className="product-skeleton__image"></div>
        <div className="product-skeleton__body">
          <div className="product-skeleton__rating">
            <Star size={16} color="#dddddd" fill="#dddddd" />
            <Star size={16} color="#dddddd" fill="#dddddd" />
            <Star size={16} color="#dddddd" fill="#dddddd" />
            <Star size={16} color="#dddddd" fill="#dddddd" />
            <Star size={16} color="#dddddd" fill="#dddddd" />
          </div>
          <div className="product-skeleton__name"></div>
          <div className="product-skeleton__data">
            <div></div>
            <div></div>
          </div>
          <div className="product-skeleton__description">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="product-skeleton__categories">
            <div></div>
            <div></div>
          </div>
          <div className="product-skeleton__button"></div>
        </div>
    </div>
  );
};

export default ProductSkeleton;