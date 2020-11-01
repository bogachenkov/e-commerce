import { render, screen, cleanup, gqlMockProducts as products, waitForElementToBeRemoved } from '@rtl';
import Products from './Products';

afterEach(cleanup);

describe('<Products />', () => {
  it('renders <Spinner /> while fetching data and then renders products', async () => {
    render(<Products />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'));

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getByText(`${products.length} items`)).toBeInTheDocument();
    expect(screen.getAllByText(/Product/i)).toHaveLength(products.length);
  })
})