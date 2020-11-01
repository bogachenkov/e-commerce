import { render, cleanup, screen } from '@rtl';

import Field from './Field';

afterEach(cleanup);

describe('<Field />', () => {
  it('render correctly without error prop', () => {
    render(
      <Field id="test" label="Test" error={null}>
        <input type="text" id="test"/>
      </Field>
    );
    expect(screen.getByLabelText(/Test/i)).toBeInTheDocument();
    expect(screen.queryByText(/This field is required/i)).toEqual(null);
  });

  it('render correctly with error prop', () => {
    render(
      <Field id="test" label="Test" error={'some error'}>
        <input type="text" id="test"/>
      </Field>
    );
    expect(screen.getByLabelText(/Test/i)).toBeInTheDocument();
    expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
  });
});
