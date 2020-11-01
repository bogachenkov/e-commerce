import Link from 'next/link';
import React, { useLayoutEffect, useRef } from 'react';

export interface IProductRoot {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
}

interface IRelatedItemsProps {
  products: IProductRoot[]
}

const RelatedItems:React.FC<IRelatedItemsProps> = ({ products }) => {
  const relatedRef = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    relatedRef.current.scrollIntoView({ behavior: "smooth", block: 'end' })
  }, [])

  return (
    <div className={`related-items`}>
      <h2 className="related-items__heading">Related Products</h2>
      <div ref={relatedRef} className="related-items__list">
        {
         products.map(p =>
            <Link key={p.id} href={`/?slug=${p.slug}`} as={`/products/${p.slug}`} scroll={false}>
              <div className="related-items__item">
                <img className="related-items__image" src={`/images/products/medium/${p.image}`} alt={p.name} />
                <h3 className="related-items__name">{p.name}</h3>
                <p className="related-items__price">${p.price}</p>
              </div>
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default RelatedItems;