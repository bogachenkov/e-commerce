import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Star } from 'react-feather';

import { useRecoilState } from 'recoil';
import { shoppingCartState } from 'src/recoil';

import Button from '../Button/Button';
import ProductSkeleton from '../ProductSkeleton/ProductSkeleton';
import RelatedItems, { IProductRoot } from '../RelatedItems/RelatedItems';

interface IProductProps {
  slug: string;
}

export const PRODUCT_QUERY = gql`
  query ProductQuery($slug: ID!, $limit: Int, $excludeBySlug: ID) {
    product(slug: $slug) {
      id,
      name,
      rating,
      price,
      in_stock,
      description,
      image,
      category {
        name
      },
      productType {
        name,
        products(limit: $limit, excludeBySlug: $excludeBySlug) {
          id,
          slug,
          name,
          image,
          price
        }
      }
    }
  }
`;



interface ISingleProduct extends IProductRoot {
  description: string;
  rating: number;
  color: string;
  in_stock: number;
  category: {
    name: string;
  };
  productType: {
    name: string;
    products: IProductRoot[]
  };
}



interface IProductQueryData {
  product: ISingleProduct
}

interface IProductQueryVars {
  slug: string;
  limit: number;
  excludeBySlug: string;
}

const Product:React.FC<IProductProps> = ({ slug }) => {
  const [ relatedProductsIsShown, setRelatedProductsVisibility ] = useState(false);
  const [ cartState, setCartState ] = useRecoilState(shoppingCartState);
  const { data, loading } = useQuery<IProductQueryData, IProductQueryVars>(PRODUCT_QUERY, {
    variables: {
      slug,
      limit: 3,
      excludeBySlug: slug
    }
  });

  useEffect(() => {
    setRelatedProductsVisibility(false);
  }, [slug])

  if (loading) return <ProductSkeleton />

  const { product } = data;
  const productIsInTheCart = cartState.some(p => p.id === product.id);

  const handleBtnClick = () => {
    if (productIsInTheCart) {
      setCartState(state => {
        return state.filter(p => p.id !== product.id);
      });
    } else {
      setCartState(state => {
        return [...state, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          slug
        }];
      });
    }
  }

  return (
    <section className="product">
      <div className="product__content">
        <img className="product__image" src={`/images/products/normal/${product.image}`} alt={product.name} />
        <div className="product__body">
          <ul className="product__rating">
            {
              new Array(product.rating).fill('star').map((_, i) => (
                <li data-testid="rating-item" key={`star-${i}`}>
                  <Star size={16} />
                </li>
              ))
            }
          </ul>
          <h2 className="product__name">{product.name}</h2>
          <div className="product__data">
            <p className="product__price">${product.price}</p>
            <p className="product__in-stock">{product.in_stock} items in stock</p>
          </div>
          <p className="product__description">
            {product.description}
          </p>
          <p className="product__category">
            Category: <span>{product.category.name}</span>
          </p>
          <p className="product__type">
            Product Type: <span>{product.productType.name}</span>
          </p>
          <Button className={`product__btn ${productIsInTheCart ? 'product__btn_remove' : 'product__btn_add'}`}
                  onClick={handleBtnClick} >
            { productIsInTheCart ? 'Remove from cart' : 'Add to cart' }
          </Button>
          {
            product.productType.products.length > 0 && (
              <button className="product__show-related" onClick={() => setRelatedProductsVisibility(state => !state)}>
                {relatedProductsIsShown ? 'Hide' : 'Show'} Related Products
              </button>
            )
          }
        </div>
      </div>
      { relatedProductsIsShown && <RelatedItems products={product.productType.products} />}
    </section>
  );
};

export default Product;