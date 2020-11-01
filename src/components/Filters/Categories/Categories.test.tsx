import React from 'react';
import { fireEvent, render, screen, cleanup } from '@rtl';

import Categories from './Categories';
import { categories } from 'src/types/data';

afterEach(cleanup);

describe('<Categories />', () => {
  it('renders correctly based on props', () => {
    const selectCategory = jest.fn();
    const { id } = categories.find(cat => cat.name === 'Plants');

    render(<Categories selectedCategory={id} selectCategory={selectCategory} />);

    expect(screen.getByText('Plants')).toHaveClass('categories__item-selected');

    expect(screen.getByText('All')).not.toHaveClass('categories__item-selected');

    expect(selectCategory).toBeCalledTimes(0);
    fireEvent.click(screen.getByText('All'));
    expect(selectCategory).toBeCalledTimes(1);
  });
});