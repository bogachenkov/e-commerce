import { render, screen, cleanup, fireEvent, routerPushed, gqlMockProduct as product } from '@rtl';

import ProductCard from './ProductCard';

afterEach(cleanup);

describe('<ProductCard />', () => {
  it('renders correctly', () => {
    render(
      <ProductCard id={product.id}
                   image={product.image}
                   in_stock={product.in_stock}
                   name={product.name}
                   price={product.price}
                   slug={product.slug}
      />
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', `/images/ui/placeholder.png`);
    expect(screen.getByRole('img')).toHaveAttribute('data-src', `/images/products/medium/${product.image}`);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    expect(screen.getByText(`${product.in_stock} items available`)).toBeInTheDocument();
  });

  it('pushes new path in router when clicked', () => {
    render(
      <ProductCard id={product.id}
                   image={product.image}
                   in_stock={product.in_stock}
                   name={product.name}
                   price={product.price}
                   slug={product.slug}
      />
    );

    fireEvent.click(screen.getByRole('img'));
    expect(routerPushed).toBeCalledTimes(1);
    expect(routerPushed).toHaveBeenCalledWith(`/?slug=${product.slug}`);
  })
});