import React from 'react';
import './Button.css'; 
const Button = ({ onClick, text }) => {
  return <button className='mainButton' onClick={onClick}>{text}</button>;
};

export default Button;