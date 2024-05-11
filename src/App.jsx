
import React, { useState } from 'react';
import Button from './components/Button';
import Recipe from './components/Recipe';
import { GoogleGenerativeAI } from "@google/generative-ai";
import RecipeGenerator from './components/RecipeGenerator';
import Doubt from './components/Doubt';
import mainImage from './assets/mainImage.jpg'
import './styles.css';


const App = () => {
  const genAI = new GoogleGenerativeAI("Insira aqui a key do Google Gemini");
  const [recipe, setRecipe] = useState('');


  const [loading, setLoading] = useState(false); 

  

  const generateRecipe = async (ingredients) => {
    setLoading(true);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
   
    const prompt = `Faça uma receita gostosa, nutritiva e criativa usando os seguintes ingredientes: ${ingredients}. Envie apenas com as tags html e no final uma tabela nutricional. Envie o texto sem o DOCTYPE, sem a tag <HTML>, sem <HEAD>, sem <BODY> e <FOOTER>. Use apenas tags simples como H2, P, etc de HTML Semântico. A receita fará parte apenas de uma parte do site, NÃO É UM SITE NOVO. OU SEJA, NÃO É UM ARQUIVO DE HTML NOVO. Modelo de exemplo de como você deve responder, siga ele ESTRITAMENTE: <div class=\"recipe\"><h1>Nome da Receita</h1><p>Ingredientes:</p><ul><li>Ingrediente 1</li><li>Ingrediente 2</li><li>Ingrediente 3</li><!-- Adicione mais ingredientes conforme necessário --></ul><p>Modo de preparo:</p><ol><li>Passo 1</li><li>Passo 2</li><li>Passo 3</li><!-- Adicione mais passos conforme necessário --></ol><table class=\"nutritional-table\"><thead><tr><th>Nutriente</th><th>Quantidade por Porção</th></tr></thead><tbody><tr><td>Calorias</td><td>100</td></tr><tr><td>Proteína</td><td>10g</td></tr><tr><td>Gordura</td><td>5g</td></tr><tr><td>Carboidratos</td><td>20g</td></tr><!-- Adicione mais nutrientes conforme necessário --></tbody></table></div>`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setRecipe(text);
  
    setLoading(false);
  };
  const answerDoubt = async (askedDoubt) => {
    setLoading(true);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    
    const prompt = `Responda como um verdadeiro chefe de cozinha. Seja direto mas seja educado. Você recebeu a seguinte duvida:${askedDoubt}. Veja esse modelo de como você deve responder: Veja esse modelo de exemplo de como você deve responder: <div class=\"recipe\"><h1>Repetir Exatamente a mesma Pergunta Feita</h1><p>Resposta da pergunta</p></div>`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setRecipe(text);
    console.log(response)
    setLoading(false);
  };
  const generateDailyRecipe = async () => {
    setLoading(true);
    let mealType = '';
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 10) {
      mealType = 'tomar café da manhã';
    } else if (currentHour >= 10 && currentHour < 15) {
      mealType = 'almoçar';
    } else if (currentHour >= 15 && currentHour < 18) {
      mealType = 'lanchar'
    }else if (currentHour >= 18 && currentHour < 22) {
      mealType = 'jantar';
    } else {
      mealType = 'comer a ceia da noite';
    }



    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const prompt = `Faça uma receita gostosa, nutritiva e criativa para ${mealType} apenas com as tags html e no final uma tabela nutricional. Envie o texto sem o DOCTYPE, sem a tag <HTML>, sem <HEAD>, sem <BODY> e <FOOTER>. Use apenas tags simples como H2, P, etc de HTML Semântico. A receita fará parte apenas de uma parte do site, NÃO É UM SITE NOVO. OU SEJA, NÃO É UM ARQUIVO DE HTML NOVO. Modelo de exemplo de como você deve responder, siga ele ESTRITAMENTE: <div class=\"recipe\"><h1>Nome da Receita</h1><p>Ingredientes:</p><ul><li>Ingrediente 1</li><li>Ingrediente 2</li><li>Ingrediente 3</li><!-- Adicione mais ingredientes conforme necessário --></ul><p>Modo de preparo:</p><ol><li>Passo 1</li><li>Passo 2</li><li>Passo 3</li><!-- Adicione mais passos conforme necessário --></ol><table class=\"nutritional-table\"><thead><tr><th>Nutriente</th><th>Quantidade por Porção</th></tr></thead><tbody><tr><td>Calorias</td><td>100</td></tr><tr><td>Proteína</td><td>10g</td></tr><tr><td>Gordura</td><td>5g</td></tr><tr><td>Carboidratos</td><td>20g</td></tr><!-- Adicione mais nutrientes conforme necessário --></tbody></table></div>`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setRecipe(text);
    setLoading(false); 
  };



  return (
    
    <div className="container">
          
      <div className="container">
      {loading ? (
        <><div className="loading"><img src={mainImage} alt="Cozinha" style={{ width: '20%', marginBottom: '20px' }} /><p>Gerando sua resposta...</p></div></> 
      ) : (
        <>
          
          <div className="buttons">
            

            {!recipe && <Button onClick={generateDailyRecipe} text="Gerar Receita Aleatória" />} 
            {!recipe && <RecipeGenerator onGenerate={generateRecipe} text="Gerar Receita Com Ingredientes" />}
            {!recipe && <Doubt onGenerate={answerDoubt} text="Dúvidas na cozinha? Pode me perguntar" />}
          </div>
          
          <div className="recipe-part">
            {recipe && <Recipe recipe={recipe} />}
          </div>
          
          
        </>
      )}
      </div>
    </div>
  );
};

export default App;