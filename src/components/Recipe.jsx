import React from 'react';
import './Recipe.css'

const Recipe = ({ recipe }) => {
  return (

      <div  dangerouslySetInnerHTML={{ __html: recipe }} />

  );
};

export default Recipe;