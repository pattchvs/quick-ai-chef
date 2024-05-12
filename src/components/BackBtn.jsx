import React from 'react';
import './Button.css'; 
const BackBtn = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default BackBtn;