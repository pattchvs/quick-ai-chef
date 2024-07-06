import React, { useState } from 'react';

const RecipeImage = ({ onGenerate }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!image) {
      alert('Por favor, selecione uma imagem.');
      return;
    }
    
    // Aqui você pode fazer o que quiser com a imagem
    // Por exemplo, enviar a imagem para o servidor
    onGenerate(image);
    
    // Limpar o estado
    setImage(null);
    setShowForm(false);
  };

  return (
    <div>
      {!showForm && (
        <button className='mainButton' onClick={handleButtonClick}>Gerar receita com imagem dos ingredientes</button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="image">Selecione uma imagem:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleInputChange}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default RecipeImage;