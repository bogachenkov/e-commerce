import React from 'react';
import { findByText, fireEvent, getByText, render } from '@testing-library/react';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing';

import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { NextRouter } from 'next/router';
import { PRODUCTS_QUERY } from 'src/components/Products/Products';
import { shoppingCartState } from 'src/recoil';
import { PRODUCT_QUERY } from 'src/components/Product/Product';


type RendeParams = Parameters<typeof render>;
type RenderUI = RendeParams[0];
type RenderOptions = RendeParams[1] & { router?: Partial<NextRouter> };

export const gqlMockProduct = {
  id: 'product-4',
  name: 'Product 4',
  description: 'Product description',
  slug: 'product-4',
  productType: {
    name: 'test',
    products: [
      {
        id: 'product-1',
        slug: 'product-1',
        name: 'Product 1',
        image: 'foo.jpg',
        price: 100
      },
      {
        id: 'product-2',
        slug: 'product-2',
        name: 'Product 2',
        image: 'foo.jpg',
        price: 100
      },
      {
        id: 'product-3',
        slug: 'product-3',
        name: 'Product 3',
        image: 'foo.jpg',
        price: 100
      }
    ]
  },
  image: 'foo.jpg',
  price: 100,
  category: {
    name: 'test',
  },
  rating: 5,
  color: 'white',
  in_stock: 5 // OR isAvailable: boolean
}

export const gqlMockProducts = [
  {
    id: 'product-1',
    name: 'Product 1',
    image: 'some-image.jpg',
    price: 100,
    slug: 'product-1',
    in_stock: 5
  },
  {
    id: 'product-2',
    name: 'Product 2',
    image: 'some-image.jpg',
    price: 100,
    slug: 'product-2',
    in_stock: 5
  },
  {
    id: 'product-3',
    name: 'Product 3',
    image: 'some-image.jpg',
    price: 100,
    slug: 'product-3',
    in_stock: 5
  },
  {
    id: 'product-4',
    name: 'Product 4',
    image: 'some-image.jpg',
    price: 100,
    slug: 'product-4',
    in_stock: 5
  }
];

const gqlMocks = [
  {
    request: {
      query: PRODUCTS_QUERY,
      variables: {
        filters: {
          category: null,
          priceFrom: null,
          priceTo: null,
          colors: [],
          sortBy: 'name',
          order: 'asc'
        }
      }
    },
    result: {
      data: {
        products: gqlMockProducts,
      }
    }
  },
  {
    request: {
      query: PRODUCT_QUERY,
      variables: {
        slug: 'product-4',
        limit: 3,
        excludeBySlug: 'product-4'
      }
    },
    result: {
      data: {
        product: gqlMockProduct
      }
    }
  }
]

export const recoilCartState = [
  {
    id: 'product-1',
    name: 'Product 1',
    price: 100,
    image: 'foo',
    slug: 'product-1'
  },
  {
    id: 'product-2',
    name: 'Product 2',
    price: 100,
    image: 'foo',
    slug: 'product-2'
  },
  {
    id: 'product-3',
    name: 'Product 3',
    price: 100,
    image: 'foo',
    slug: 'product-3'
  }
];

const mockRecoilState:(mutableSnapshot: MutableSnapshot) => void = ({ set }) => {
  set(shoppingCartState, recoilCartState);
};

const customRender = (ui: RenderUI, { wrapper, router, ...options}: RenderOptions = {}) => {
  wrapper = ({ children }) => {
    return (
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        <MockedProvider mocks={gqlMocks} addTypename={false}>
          <RecoilRoot initializeState={mockRecoilState}>
            { children }
          </RecoilRoot>
        </MockedProvider>
      </RouterContext.Provider>
    )
  };

  return render(ui, { wrapper, ...options });
};

export const routerPushed = jest.fn();

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: path => {
    routerPushed(path);
    return Promise.resolve(true);
  },
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

const keyDownEvent = {
  key: 'ArrowDown'
};

export const selectOption = async (container: HTMLElement, optionText: string) => {
  const placeholder = getByText(container, /Select/i);
  fireEvent.keyDown(placeholder, keyDownEvent);
  await findByText(container, optionText);
  fireEvent.click(getByText(container, optionText));
};

export * from '@testing-library/react';
export { customRender as render };