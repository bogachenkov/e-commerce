import { render, screen, cleanup, fireEvent, recoilCartState as state } from '@rtl';
import ShoppingCart from './ShoppingCart';

afterEach(cleanup);

describe('<ShoppingCart />', () => {
  it('renders correctly', () => {
    const totalPrice = state.reduce((total, prod) => prod.price + total, 0);
    render(<ShoppingCart products={state} totalPrice={totalPrice} />);

    expect(screen.getAllByText(/Product/i)).toHaveLength(state.length);
    expect(screen.getAllByText(`$${totalPrice}`)[1]).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(state.length);
  });
});