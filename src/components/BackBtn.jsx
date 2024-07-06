import React from 'react';
import './BackBtn.css'; 
const BackBtn = ({ onClick, text }) => {
  return <button  onClick={onClick}>Voltar</button>;
};

export default BackBtn;