import { render, screen, fireEvent, cleanup } from '@rtl';
import SortBy from './SortBy';

afterEach(cleanup);

describe('<SortBy />', () => {
  it('selecting correctly', () => {
    render(<SortBy />);

    const options = screen.getAllByRole('option') as HTMLOptionElement[];

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(options[0].selected).toBeTruthy();

    fireEvent.change(screen.getByLabelText(/Sort by/i), { target: { value: 'asc_price' } });

    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
  });
});