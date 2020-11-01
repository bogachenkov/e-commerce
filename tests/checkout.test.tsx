import { render, screen, fireEvent } from '@rtl';

import CheckoutPage from "pages/checkout";

describe('<CheckoutPage />', () => {
  it('renders and works correctly', () => {
    render(<CheckoutPage />);
    // Check all products from initial recoil state and their total price
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 3/i)).toBeInTheDocument();
    expect(screen.getAllByText(/\$300/i)[0]).toBeInTheDocument();

    // Removing the first product, checking that it has been removed
    // and the total price should be recalculated
    const removeFirstProductBtn = screen.getAllByText('Remove')[0];
    fireEvent.click(removeFirstProductBtn);
    expect(screen.queryByText(/Product 1/i)).toEqual(null);
    expect(screen.getAllByText(/\$200/i)[0]).toBeInTheDocument();

    // Remove all products from our cart
    screen.getAllByText('Remove').forEach(btn => fireEvent.click(btn));

    // It should be an `empty cart screen` with message and link to homepage
    expect(screen.getByText(/Your cart is currently empty/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
})
