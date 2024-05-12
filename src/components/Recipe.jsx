import React from 'react';
import './Recipe.css'



const Recipe = ({ recipe }) => {
  return (
      <div>

        <div  dangerouslySetInnerHTML={{ __html: recipe }} />
      </div>
      
      

  );
};

export default Recipe;