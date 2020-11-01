import { render, screen, cleanup, fireEvent, gqlMockProduct as product } from '@rtl';
import Product from './Product';

beforeEach(window.HTMLElement.prototype.scrollIntoView = () => {});

afterEach(cleanup);

describe('<Product />', () => {
  it('renders correctly', async () => {
    render(<Product slug='product-4' />)

    // Loading data
    expect(screen.getByTestId('product-skeleton')).toBeInTheDocument();

    await screen.findByText(product.name);
    expect(screen.getAllByTestId('rating-item')).toHaveLength(product.rating);
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', `/images/products/normal/${product.image}`);
    expect(screen.getByText(`${product.in_stock} items in stock`)).toBeInTheDocument();
  });

  it('adding/removing product from cart', async () => {
    render(<Product slug='product-4' />);

    await screen.findByText(/Add to cart/i);
    expect(screen.getByText(/Add to cart/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Add to cart/i));
    expect(screen.getByText(/Remove from cart/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Remove from cart/i));
    expect(screen.getByText(/Add to cart/i)).toBeInTheDocument();
  });

  it('showing/closing related products', async () => {
    render(<Product slug='product-4' />);

    await screen.findByText(/Show Related Products/i);
    fireEvent.click(screen.getByText(/Show Related Products/i));
    expect(screen.getByText(/Hide Related Products/i)).toBeInTheDocument();
    product.productType.products.forEach(p =>
      expect(screen.getByText(p.name)).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText(/Hide Related Products/i));
    expect(screen.queryByText(product.productType.products[0].name)).toEqual(null);
  });
});