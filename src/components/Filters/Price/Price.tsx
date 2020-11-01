import React from 'react';
import RangeComponent from 'src/components/RangeComponent/RangeComponent';

interface IPriceProps {
  values: number[],
  setValues: React.Dispatch<React.SetStateAction<number[]>>
}

const Price:React.FC<IPriceProps> = ({ values, setValues }) => {
  return (
    <div className="price">
      <h3 className="price__heading">Price</h3>
      <div className="price__range">
        <RangeComponent values={values} onChange={setValues} />
      </div>
      <div className="price__values">
        <span className="price__value">{ values[0] }</span>
        <span className="price__value">{ values[1] }</span>
      </div>
    </div>
  );
};

export default React.memo(Price);