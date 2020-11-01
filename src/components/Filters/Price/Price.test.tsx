import { render, screen, cleanup } from '@rtl';

import Price from './Price';

afterEach(cleanup);

describe('<Price />', () => {
  it('render correctly', () => {
    const changePrice = jest.fn();
    render(<Price values={[0, 500]} setValues={changePrice} />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(changePrice).toBeCalledTimes(0);
  });
})