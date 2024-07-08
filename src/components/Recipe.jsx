import React from 'react';
import './Recipe.css'



const Recipe = ({ recipe }) => {
  const ingredientes = recipe.ingredientes
  const instrucoes = recipe.instrucoes
  console.log(ingredientes)
  return (

   
    <>
      <div className='recipeBox'>
        <section className="title">
          <h2>{recipe.nome}</h2>
          <h3>{recipe.descricao}</h3>
          <h4>Tempo de cozimento: {recipe.tempo_cozimento}</h4>  
          <h4>Tempo de preparo: {recipe.tempo_preparo}</h4>  
          <h4>Rendimento: {recipe.rendimento}</h4>
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
                <tr key={index}>
                  <td>{ingrediente.nome}</td>
                  <td className='ingredients-quantity'>{ingrediente.quantidade} {ingrediente.unidade}</td>
                </tr>
                    ))}
              
              </tbody>
            </table>
          </div>  
          <h3>Instruções:</h3>
          {instrucoes.map((instrucao, index)=>(
          <p key={index}>{index+1} - {instrucao}</p>
          ))}
        </section>
      </div>
        
          
        
        
    </>
  
  );
};

export default Recipe;