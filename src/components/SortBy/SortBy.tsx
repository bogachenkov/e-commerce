import React from 'react';

import { useRecoilState } from 'recoil';
import { sortState } from 'src/recoil';

const SortBy:React.FC = () => {
  const [sortBy, setSortBy] = useRecoilState(sortState);
  return (
    <>
      <label htmlFor="sort-by">Sort By</label>
      <select id="sort-by" onChange={e => setSortBy(e.target.value)} value={sortBy} className="sort-by">
        <option value="asc_name" defaultChecked>Name: A-Z</option>
        <option value="desc_name" defaultChecked>Name: Z-A</option>
        <option value="asc_price" defaultChecked>Price: Low to High</option>
        <option value="desc_price" defaultChecked>Price: High to Low</option>
      </select>
    </>
  );
};

export default SortBy;