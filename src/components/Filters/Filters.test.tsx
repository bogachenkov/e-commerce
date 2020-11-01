import { render, screen, cleanup, fireEvent } from '@rtl';
import Filters from './Filters';

afterEach(cleanup);

describe('<Filters />', () => {
  it('renders and working correctly', () => {
    render(<Filters />);

    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Colors')).toBeInTheDocument();

    expect(screen.getByText(/Apply filters/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Furniture/i));
    expect(screen.getByText(/Furniture/i)).toHaveClass('categories__item-selected');

    expect(screen.queryByTestId('color-check-icon')).toEqual(null);
    fireEvent.click(screen.getByDisplayValue('Gray'));
    expect(screen.getByTestId('color-check-icon')).toBeInTheDocument();
  })
});