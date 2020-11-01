import React from 'react';
import { categories } from 'src/types/data';

interface ICategoriesProps {
  selectedCategory: string,
  selectCategory: React.Dispatch<React.SetStateAction<string>>
}

const Categories:React.FC<ICategoriesProps> = ({ selectedCategory, selectCategory }) => {
  return (
    <div className="categories">
      <h3 className="categories__heading">Categories</h3>
      <p className={`categories__item ${ selectedCategory === null ? 'categories__item-selected' : ''}`}
          tabIndex={1}
          onClick={() => selectCategory(null)}>
        All
      </p>
      {
        categories.map(cat => (
          <p className={`categories__item ${cat.id === selectedCategory ? 'categories__item-selected' : ''}`}
             tabIndex={0}
             onClick={() => selectCategory(cat.id)}
             key={cat.id}>
            {cat.name}
          </p>
        ))
      }
    </div>
  );
};

export default React.memo(Categories);