import React from 'react';

const Button:React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button {...props} className={`button ${props.className ? props.className : ''}`}>
      {children}
    </button>
  );
};

export default Button;