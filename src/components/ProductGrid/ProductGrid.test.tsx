import { render, screen, cleanup, gqlMockProducts as products, findByRole } from '@rtl';
import ProductGrid from './ProductGrid';
import Modal from 'react-modal';

beforeEach(window.scrollTo = jest.fn());
afterEach(() => {
  cleanup();
  jest.resetAllMocks();
  jest.clearAllMocks();
});

Modal.setAppElement('body');

describe('<ProductGrid />', () => {
  it('renders empty screen if no product passed', () => {
    render(<ProductGrid products={[]} />);

    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/ui/no-products.png');
    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  })

  it('renders correctly and without modal if there is no query in the router path', () => {
    render(<ProductGrid products={products} />);

    expect(screen.getAllByText(/Product/i)).toHaveLength(products.length);
    expect(screen.queryByRole('dialog')).toEqual(null);
  });

  it('renders with modal if there is a query in the router path', async () => {
    render(<ProductGrid products={products} />, {
      router: {
        query: {
          slug: 'product-4'
        }
      }
    });

    await screen.getByTestId('product-skeleton');
    //expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument();
  })
})