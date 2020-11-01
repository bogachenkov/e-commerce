import React from 'react';
import { Check } from 'react-feather';

interface IColorsProps {
  selectedColors: string[],
  setColors: React.Dispatch<React.SetStateAction<string[]>>
}

const Colors:React.FC<IColorsProps> = ({ selectedColors, setColors }) => {
  const colorScheme = [
    {
      id: 'gray',
      value: 'Gray',
      color: '#ccc'
    },
    {
      id: 'white',
      value: 'White',
      color: '#ffffff'
    },
    {
      id: 'brown',
      value: 'Brown',
      color: '#790a0a'
    },
    {
      id: 'black',
      value: 'Black',
      color: '#000000'
    },
    {
      id: 'green',
      value: 'Green',
      color: '#226200'
    }
  ];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setColors(prevState => {
      if (prevState.includes(value)) return prevState.filter(val => val !== value);
      return [...prevState, value];
    });
  }

  return (
    <div className="colors">
      <h3 className="colors__heading">Colors</h3>
      <div className="colors__list">
        {
          colorScheme.map(({ id, value, color }) => (
            <label title={value} style={{ backgroundColor: color, color: ['White', 'Gray'].includes(value) ? '#000000' : '#ffffff' }} key={id} className="colors__item">
              <input type="checkbox" name="colors" checked={selectedColors.includes(value)} value={value} onChange={handleCheckboxChange} />
              { selectedColors.includes(value) && <Check data-testid="color-check-icon" size={22} /> }
            </label>
          ))
        }
      </div>
    </div>
  );
};

export default React.memo(Colors);