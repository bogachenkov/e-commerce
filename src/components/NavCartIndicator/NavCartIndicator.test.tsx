import { screen, render, recoilCartState } from '@rtl';

import NavCartIndicator from './NavCartIndicator';

describe('<NavCartIndicator />', () => {
  it('renders correctly', () => {
    render(<NavCartIndicator />);
    expect(screen.getByText(`My Cart (${recoilCartState.length})`));
  });
})