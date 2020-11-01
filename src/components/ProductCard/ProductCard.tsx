import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

import { useRecoilValue } from 'recoil';
import { imgObserver } from 'src/recoil';

interface IProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  in_stock: number;
  slug: string;
}

const ProductCard:React.FC<IProductCardProps> = ({ name, price, image, in_stock, slug }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const imageObserver = useRecoilValue(imgObserver);

  useEffect(() => {
    imageObserver && imageObserver.observe(imgRef.current);
    return () => imageObserver && imageObserver.unobserve(imgRef.current)
  });

  return (
    <Link href={`/?slug=${slug}`} as={`/products/${slug}`} shallow={true} scroll={false}>
      <article className="product-card">
        <header className="product-card__header">
          <img ref={imgRef} className="product-card__image" src="/images/ui/placeholder.png" data-src={`/images/products/medium/${image}`} alt={name} />
        </header>
        <div className="product-card__body">
          <div className="product-card__description">
            <p className="product-card__name">{name}</p>
            <span className="product-card__available" >{in_stock} items available</span>
          </div>
          <span className="product-card__price">${price}</span>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;