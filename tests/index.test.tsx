import { render, screen, gqlMockProducts as products } from '@rtl';

import MockedIntersectionObserver from 'tests/__mocks__/intersectionObserver';

import Home from "../pages/index";

window.IntersectionObserver = MockedIntersectionObserver;

describe('<Home />', () => {
  it("renders without any crashes", async () => {
    render(<Home />);
    expect(screen.getByText(/Home Decor Store/i)).toBeInTheDocument();
    expect(screen.getByText(/Filter by/i)).toBeInTheDocument();
    await screen.findByLabelText(/Sort by/i);
    products.forEach(product => expect(screen.getByText(product.name)).toBeInTheDocument());
    expect(screen.getByText(`${products.length} items`)).toBeInTheDocument();
    //expect().toBeInTheDocument();
  });
})