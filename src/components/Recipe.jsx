import React from 'react';
import './Recipe.css'



const Recipe = ({ recipe }) => {
  return (
    <>
      <div className='recipeBox'>
        <section className="title">
          <h2>{recipe.nome}</h2>
          <h3>{recipe.descricao}</h3>
          <h4>Tempo de preparo: {recipe.tempo_preparo}</h4>
          <h4>Tempo de cozimento: {recipe.tempo_cozimento}</h4>    
          <h4>Tempo de cozimento: {recipe.dificuldade}</h4>    
        </section>
      </div>
        
          
        
        
    </>
  
  );
};

export default Recipe;