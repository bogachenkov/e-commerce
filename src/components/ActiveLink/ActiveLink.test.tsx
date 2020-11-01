import { render, screen, cleanup } from '@rtl';
import ActiveLink from './ActiveLink';

afterEach(cleanup);

describe('<ActiveLink />', () => {
  it('not sets activeClassName to child if current path not equals to href', () => {
    render(
      <ActiveLink activeClassName="link-active" href="/foo">
        <a>Link</a>
      </ActiveLink>
    );
    expect(screen.getByText(/Link/i)).toBeInTheDocument();
    expect(screen.getByText(/Link/i)).not.toHaveClass('link-active');
  });

  it('sets activeClassName to child if path equals to href', () => {
    render(
      <ActiveLink activeClassName="link-active" href="/foo">
        <a>Link</a>
      </ActiveLink>,
      {
        router: {
          asPath: '/foo'
        }
      }
    );
    expect(screen.getByText(/Link/i)).toBeInTheDocument();
    expect(screen.getByText(/Link/i)).toHaveClass('link-active');
  })
});