import React from 'react';
import { fireEvent, render, screen } from '@rtl';

import Colors from './Colors';

describe('<Colors />', () => {
  it('renders correctly based on props', () => {
    const setColors = jest.fn();
    render(<Colors selectedColors={['White', 'Brown']} setColors={setColors} />);

    expect(screen.getByDisplayValue('White')).toBeChecked();
    expect(screen.getByDisplayValue('Brown')).toBeChecked();
    expect(screen.getAllByTestId('color-check-icon')).toHaveLength(2);

    expect(screen.getByDisplayValue('Gray')).not.toBeChecked();

    expect(setColors).toBeCalledTimes(0);
    fireEvent.click(screen.getByDisplayValue('Gray'));
    expect(setColors).toBeCalledTimes(1);
  });
});