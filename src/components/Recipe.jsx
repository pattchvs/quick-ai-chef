import React from 'react';
import './Recipe.css'



const Recipe = ({ recipe }) => {
  const ingredientes = recipe.ingredientes
  console.log(ingredientes)
  return (

   
    <>
      <div className='recipeBox'>
        <section className="title">
          <h2>{recipe.nome}</h2>
          <h3>{recipe.descricao}</h3>
          <h4>Tempo de preparo: {recipe.tempo_preparo}</h4>
          <h4>Tempo de cozimento: {recipe.tempo_cozimento}</h4>    
          <h4>Dificuldade: {recipe.dificuldade}</h4> 
          <div className="ingredients-table">
            <table>
              <thead>
                <tr>
                  <th>Ingredientes</th>
                  <th className='ingredients-quantity'>Quantidades</th>
                </tr>
              </thead>
              <tbody>
              {ingredientes.map((ingrediente, index)=>(
                <tr>
                  <td id='teste'>{ingrediente.nome}</td>
                  <td id="teste" className='ingredients-quantity'>{ingrediente.quantidade} {ingrediente.unidade}</td>
                </tr>
                    ))}
                
              </tbody>
            </table>

          </div>
          
        </section>
      </div>
        
          
        
        
    </>
  
  );
};

export default Recipe;