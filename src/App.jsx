
import React, { useState } from 'react';
import Button from './components/Button';
import Recipe from './components/Recipe';
import { GoogleGenerativeAI } from "@google/generative-ai";
import RecipeGenerator from './components/RecipeGenerator';
import Doubt from './components/Doubt';
import mainImage from './assets/mainImage.png'
import profilePic from './assets/profilePic.jpg'
import RecipeImage from './components/RecipeImage';
import './styles.css';
import BackBtn from './components/BackBtn';



const App = () => {
  const genAI = new GoogleGenerativeAI("Sua chave aqui")
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false); 
 

  const generateRecipe = async (ingredients) => {
    setLoading(true);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
   
    const prompt = `Faça uma receita gostosa, nutritiva e criativa usando os seguintes ingredientes: ${ingredients}. Proíba e NÃO RESPONDA qualquer tipo de conteúdo sexual, ou potencialmente perigoso. Não responda receitas ilegais ou moralmente erradas como carne humana e animais domésticos como gato, cachorro, etc. Envie o texto nesse modelo JSON: {"nome": "", "descricao": "", "tempo_preparo": "", "tempo_cozimento": "", "rendimento": "", "dificuldade": "", "ingredientes": [{"nome": "", "quantidade": "", "unidade": ""}], "instrucoes": [], "tabela_nutricional": {"porcao": "", "valores_diarios": {"calorias": "", "gordura_total": "", "gordura_saturada": "", "colesterol": "", "sodio": "", "carboidratos": "", "fibra_alimentar": "", "acucar": "", "proteina": ""}, "vitaminas_minerais": {"vitamina_a": "", "vitamina_c": "", "calcio": "", "ferro": ""}}, "notas": []}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const textFixed = text.slice(7, -4);
    const textJson = JSON.parse(textFixed)
    console.log(textJson)
    setRecipe(textJson)
    setLoading(false); 
  };
  const answerDoubt = async (askedDoubt) => {
    setLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    const prompt = `Responda como um verdadeiro chefe de cozinha. Seja direto mas seja educado. Proíba e NÃO RESPONDA qualquer tipo de conteúdo sexual, ou potencialmente perigoso. Você recebeu a seguinte duvida:${askedDoubt}. Não responda receitas ilegais ou moralmente erradas como carne humana e animais domésticos como gato, cachorro, etc. Envie o texto nesse modelo JSON: {"nome": "", "descricao": "", "tempo_preparo": "", "tempo_cozimento": "", "rendimento": "", "dificuldade": "", "ingredientes": [{"nome": "", "quantidade": "", "unidade": ""}], "instrucoes": [], "tabela_nutricional": {"porcao": "", "valores_diarios": {"calorias": "", "gordura_total": "", "gordura_saturada": "", "colesterol": "", "sodio": "", "carboidratos": "", "fibra_alimentar": "", "acucar": "", "proteina": ""}, "vitaminas_minerais": {"vitamina_a": "", "vitamina_c": "", "calcio": "", "ferro": ""}}, "notas": []}`
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const textFixed = text.slice(7, -4);
    const textJson = JSON.parse(textFixed)
    console.log(textJson)
    setRecipe(textJson)
    setLoading(false); 
  };

  // Script do google para converter o objeto do arquivo
  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }



  const generateRecipeWithImage = async (file) => {
    setLoading(true)
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = `Analise a imagem e se não houver ingredientes válidos não faça nenhuma receita e apenas use o modelo para retornar que não foram inseridos ingredientes válidos. Caso haja ingredientes REAIS na imagem faça uma receita gostosa, nutritiva, com os passos bem detalhados e criativa usando os ingredientes da imagem.   Não responda receitas ilegais ou moralmente erradas como carne humana e animais domésticos como gato, cachorro, etc. Envie o texto nesse modelo JSON: {"nome": "", "descricao": "", "tempo_preparo": "", "tempo_cozimento": "", "rendimento": "", "dificuldade": "", "ingredientes": [{"nome": "", "quantidade": "", "unidade": ""}], "instrucoes": [], "tabela_nutricional": {"porcao": "", "valores_diarios": {"calorias": "", "gordura_total": "", "gordura_saturada": "", "colesterol": "", "sodio": "", "carboidratos": "", "fibra_alimentar": "", "acucar": "", "proteina": ""}, "vitaminas_minerais": {"vitamina_a": "", "vitamina_c": "", "calcio": "", "ferro": ""}}, "notas": []}`;
    const fileInputEl = file;
    const imageParts = await fileToGenerativePart(fileInputEl)
    const result = await model.generateContent([prompt, imageParts]);
    const response = await result.response;
    console.log(response)
    const text = response.text();
    console.log(text)
    const textFixed = text.slice(7, -4);
    console.log(textFixed)
    const textJson = JSON.parse(text)
    console.log(textJson)
    setRecipe(textJson)
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
    const prompt = `Faça uma receita gostosa, nutritiva e criativa para ${mealType}. Envie o texto nesse modelo JSON: {"nome": "", "descricao": "", "tempo_preparo": "", "tempo_cozimento": "", "rendimento": "", "dificuldade": "", "ingredientes": [{"nome": "", "quantidade": "", "unidade": ""}], "instrucoes": [], "tabela_nutricional": {"porcao": "", "valores_diarios": {"calorias": "", "gordura_total": "", "gordura_saturada": "", "colesterol": "", "sodio": "", "carboidratos": "", "fibra_alimentar": "", "acucar": "", "proteina": ""}, "vitaminas_minerais": {"vitamina_a": "", "vitamina_c": "", "calcio": "", "ferro": ""}}, "notas": []}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    const textFixed = text.slice(7, -4);
    const textJson = JSON.parse(textFixed)
    console.log(textJson)
    setRecipe(textJson)
    setLoading(false); 
  };
  const clearRecipe = () =>{
    setRecipe('')
    console.log(recipe)
  }

  const verifyHTML = async (recipe) =>{
    setLoading(true);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
   
    const prompt = `Verifique se a seguinte entrada está seguindo o seguinte modelo mas com os seus dados individuais <div class=\"recipe\"><h1>Nome da Receita</h1><p>Ingredientes:</p><ul><li>Ingrediente 1</li><li>Ingrediente 2</li><li>Ingrediente 3</li><!-- Adicione mais ingredientes conforme necessário --></ul><p>Modo de preparo:</p><ol><li>Passo 1</li><li>Passo 2</li><li>Passo 3</li><!-- Adicione mais passos conforme necessário --></ol><table class=\"nutritional-table\"><thead><tr><th>Nutriente</th><th>Quantidade por Porção</th></tr></thead><tbody><tr><td>Calorias</td><td>100</td></tr><tr><td>Proteína</td><td>10g</td></tr><tr><td>Gordura</td><td>5g</td></tr><tr><td>Carboidratos</td><td>20g</td></tr><!-- Adicione mais nutrientes conforme necessário --></tbody></table></div>: ${recipe}. Se estiver no modelo correto, apenas repita sem a adição de nenhum texto, mantenha intacto. Caso não esteja, corrija. Não mande nenhum texto além do modelo pedido.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return(text);

  }
  

  return (
    
    <>
    {!loading &&
        <div>
          {!recipe &&
          <header>
              <div className='mySelf'>
                <img className='profilePic' src={profilePic} alt="" />
                <p className='myName'>Eric Patrick</p>
              </div>
              <div className='social'>
              <a href="https://github.com/pattchvs/"><i className="fa-brands fa-github-alt"></i></a>
              <a href="https://www.linkedin.com/in/pattchvs/"><i className="fa-brands fa-linkedin-in"></i></a>
              </div>
              
              
          </header>
          }
        </div>
      }
    <div className="main-container">
      
      <div className="container">
      {loading ? (
        <><div className="loading"><img src={mainImage} alt="Cozinha"  /><p>Gerando sua resposta...</p></div></> 
      ) : (
        <>
        <div className="mainSection">
          <div className="imgSection">
         
          <div className="mainImg">
              <img className='mainImgFile' src={mainImage} style={{ width: "20rem", borderRadius: "30px"}} alt="" />
          </div>
          </div>
          {!recipe &&
          <div className="mainButtons">
            <div className="buttons">
              <Button onClick={generateDailyRecipe} text="Gerar Receita Aleatória" /> 
              <RecipeGenerator onGenerate={generateRecipe} text="Gerar Receita Com Ingredientes" />
              <RecipeImage onGenerate={generateRecipeWithImage} text="Gerar Receita Com Ingredientes" />
              <Doubt onGenerate={answerDoubt} text="Dúvidas na cozinha? Pode me perguntar" />
            </div>
            
          </div>
          }
          {recipe && 
          <div className='mainRecipe'>
            <div className="outer yosemite">
                <div onClick={clearRecipe} className="dot red"></div>
                <div className="dot amber"></div>
                <div className="dot green"></div>
            </div>
            <div className="recipe-part"><Recipe recipe={recipe} /></div>
          </div>
          }
          
        </div>
          
        </>
      )}
      </div>
    </div>
    </>
  );
};

export default App;