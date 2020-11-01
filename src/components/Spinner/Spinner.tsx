import React from 'react';

const Spinner:React.FC = () => {
  return (
    <div data-testid="spinner" className="spinner__wrapper">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;