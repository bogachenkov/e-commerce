import { render, screen, cleanup, gqlMockProduct as product } from '@rtl';

import ProductPage from 'pages/products/[slug]';

afterEach(cleanup);

describe('<Products[slug] />', () => {
  it ('renders before it gets slug correctly', () => {
    render(<ProductPage />);
    expect(screen.getByText(/Return to shop/i)).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders with slug correctly', async () => {
    render(<ProductPage />, {
      router: {
        pathname: `/products/${product.slug}`,
        query: {
          slug: product.slug
        }
      }
    });

    expect(screen.getByText(/Return to shop/i)).toBeInTheDocument();
    expect(screen.getByTestId('product-skeleton')).toBeInTheDocument();

    await screen.findByText(product.name);
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', `/images/products/normal/${product.image}`);
  });
})
