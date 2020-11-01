import React, { useState } from 'react';

import { useSetRecoilState } from 'recoil';
import { filtersState } from 'src/recoil';

import Button from '../Button/Button';
import Categories from './Categories/Categories';
import Colors from './Colors/Colors';
import PriceRange from './Price/Price';

const Filters:React.FC = () => {
  const setFiltersState = useSetRecoilState(filtersState);

  const [ selectedCategory, selectCategory ] = useState<string>(null);
  const [values, setValues] = useState([0, 6000]);
  const [selectedColors, setColors] = useState<string[]>([]);

  const applyFilters = () => {
    const filtersData = {
      category: selectedCategory,
      priceFrom: values[0],
      priceTo: values[1],
      colors: selectedColors
    };

    setFiltersState(filtersData);
  };

  return (
    <aside className="filters">
      <div className="filters__content">
        <h2 className="app-h2">Filter by</h2>
        <Categories selectedCategory={selectedCategory} selectCategory={selectCategory} />
        <PriceRange values={values} setValues={setValues} />
        <Colors selectedColors={selectedColors} setColors={setColors} />
        <Button onClick={applyFilters} className="filters__button">
          Apply Filters
        </Button>
      </div>
    </aside>
  );
};

export default Filters;