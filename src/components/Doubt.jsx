import React, { useState } from 'react';

const Doubt = ({ onGenerate }) => {
  const [showForm, setShowForm] = useState(false);
  const [askedDoubt, setAskedDoubt] = useState('');

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (event) => {
    setAskedDoubt(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate(askedDoubt); 
    setAskedDoubt('');
    setShowForm(false);
  };

  return (
    <div>
      {!showForm && (
        <button onClick={handleButtonClick}>Perguntar ao chefe</button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="doubt">Insira a sua dúvida:</label>
          <input
            type="text"
            id="doubt"
            value={askedDoubt}
            onChange={handleInputChange}
            placeholder="Digite sua dúvida"
            required
          />
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
};

export default Doubt;
