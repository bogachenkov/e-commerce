import { render, screen, cleanup, fireEvent, selectOption } from '@rtl';
import { act } from 'react-dom/test-utils';
import CheckoutForm from './CheckoutForm';
import Modal from 'react-modal';

afterEach(cleanup);

Modal.setAppElement('body');

describe('<CheckoutForm />', () => {
  it('renders correctly', () => {
    render(<CheckoutForm />);

    expect(screen.getByText(/Customer Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment Information/i)).toBeInTheDocument();

    expect(screen.getByRole('button')).toHaveTextContent(/Complete the order/i);

    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card holder/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card cvc/i)).toBeInTheDocument();
  });

  it('should show required errors when values are invalid', async () => {
    render(<CheckoutForm />);

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    const errors = await screen.findAllByText(/This field is required/i);
    expect(errors[0]).toBeInTheDocument();
  });

  it('renders modal window if form successfully submitted', async () => {
    render(<CheckoutForm />);

    expect(screen.getAllByText(/Return to shop/i)).toHaveLength(1);

    // Filling the form
    fireEvent.input(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.input(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.input(screen.getByLabelText(/Address/i), { target: { value: 'Empty street, 2/3' } });
    fireEvent.input(screen.getByLabelText(/City/i), { target: { value: 'London' } });
    await selectOption(screen.getByTestId('react-select'), 'United Kingdom');
    fireEvent.input(screen.getByLabelText(/Postal code/i), { target: { value: '143900' } });
    fireEvent.input(screen.getByLabelText(/Phone/i), { target: { value: '+7 (123) 456-78-90' } });
    fireEvent.input(screen.getByLabelText(/Card holder/i), { target: { value: 'JOHN DOE' } });
    fireEvent.input(screen.getByLabelText(/Card number/i), { target: { value: '4000 0000 0000 0000' } });
    fireEvent.input(screen.getByLabelText(/Expires at/i), { target: { value: '12/23' } });
    fireEvent.input(screen.getByLabelText(/Card cvc/i), { target: { value: '777' } });

    // Submiting form
    await act(async () => fireEvent.click(screen.getByRole('button')));

    // Modal window should be rendered
    expect(screen.getByText(/John, thank you for placing your order!/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Return to shop/i)).toHaveLength(2);
  })
});