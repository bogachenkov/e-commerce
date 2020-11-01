import React, { useRef } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/router';

import ProductCard from '../ProductCard/ProductCard';
import Product from '../Product/Product';

export interface IProductGrid {
  id: string;
  image: string;
  in_stock: number;
  price: number;
  slug: string;
  name: string;
}

interface IProductGridProps {
  products: IProductGrid[];
}

const ProductGrid:React.FC<IProductGridProps> = ({ products }) => {
  const router = useRouter();
  const windowOffset = useRef<number>(0);

  if (products.length === 0) return (
    <div className="product-grid__no-products">
      <img className="product-grid__empty-img" src="/images/ui/no-products.png" alt="No products found"/>
      <h1 className="product-grid__message">No products found</h1>
    </div>
  )

  return (
    <div className="product-grid">
      {
        products.map(p => (
          <ProductCard key={p.id}
                       id={p.id}
                       image={p.image}
                       in_stock={p.in_stock}
                       price={p.price}
                       slug={p.slug}
                       name={p.name} />
        ))
      }

      <Modal isOpen={!!router.query.slug}
            onAfterOpen={() => {
              windowOffset.current = window.scrollY;
              document.body.setAttribute('style', `position: fixed; top: -${windowOffset.current}px; left: 0; right: 0; padding-right: 16px`);
            }}
            onRequestClose={() => router.push('/', undefined, { shallow: true })}
            onAfterClose={() => {
              document.body.setAttribute('style', '');
              window.scrollTo(0, windowOffset.current);
            }}
            className="modal"
            overlayClassName="modal__overlay"
      >
        { router.query.slug && <Product slug={router.query.slug as string} /> }
      </Modal>
    </div>
  );
};

export default React.memo(ProductGrid);