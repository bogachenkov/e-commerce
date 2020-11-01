import { render, screen, cleanup } from '@rtl';
import ProductControls from './ProductControls';

afterEach(cleanup);

describe('<ProductControls />', () => {
  it('renders correctly', () => {
    render(<ProductControls itemsQty={5} />);

    expect(screen.getByText(/5 items/i)).toBeInTheDocument();
  });
});