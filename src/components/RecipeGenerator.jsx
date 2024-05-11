import React, { useState } from 'react';

const RecipeGenerator = ({ onGenerate }) => {
  const [showForm, setShowForm] = useState(false);
  const [ingredients, setIngredients] = useState('');

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate(ingredients);
    setIngredients('');
    setShowForm(false);
  };

  return (
    <div>
      {!showForm && (
        <button onClick={handleButtonClick}>Gerar Receita com Ingredientes</button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="ingredients">Insira os ingredientes:</label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={handleInputChange}
            placeholder="Digite os ingredientes separados por vírgula"
            required
          />
          <button type="submit">Gerar</button>
        </form>
      )}
    </div>
  );
};

export default RecipeGenerator;