import React from 'react';

interface IFieldProps {
  id: string;
  label: string;
  error: any;
}

const Field:React.FC<IFieldProps> = ({ id, label, error, children }) => {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      { children }
      { error && <span className="field__error">This field is required</span> }
    </div>
  );
};

export default Field;