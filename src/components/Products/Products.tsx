import React from 'react';

import { useQuery, gql } from '@apollo/client';

import { useRecoilValue } from 'recoil';
import { filtersState, sortAndOrder } from 'src/recoil';

import ProductControls from '../ProductControls/ProductControls';
import ProductGrid, { IProductGrid } from '../ProductGrid/ProductGrid';
import Spinner from '../Spinner/Spinner';

export const PRODUCTS_QUERY = gql`
  query ProductsQuery($filters: ProductsInputType) {
    products(filters: $filters) {
      id,
      name,
      image,
      price,
      slug,
      in_stock
    }
  }
`;

interface IProductsData {
  products: IProductGrid[]
}

interface IProductsVariables {
  filters: {
    category: string;
    priceFrom: number;
    priceTo: number;
    colors: string[];
    sortBy: string;
    order: string;
  }
}

const Products:React.FC = () => {
  const { category, priceFrom, priceTo, colors } = useRecoilValue(filtersState);
  const { sortBy, order } = useRecoilValue(sortAndOrder);

  const { data, loading } = useQuery<IProductsData, IProductsVariables>(
    PRODUCTS_QUERY,
    {
      variables: {
        filters: {
          category,
          priceFrom,
          priceTo,
          colors,
          sortBy,
          order
        }
      }
    }
  );

  if (loading) return <Spinner />

  return (
    <section>
      <ProductControls itemsQty={data.products.length} />
      <ProductGrid products={data.products} />
    </section>
  );
};

export default React.memo(Products);