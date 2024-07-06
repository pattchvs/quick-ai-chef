
import React, { useState } from 'react';
import Button from './components/Button';
import Recipe from './components/Recipe';
import { GoogleGenerativeAI } from "@google/generative-ai";
import RecipeGenerator from './components/RecipeGenerator';
import Doubt from './components/Doubt';
import mainImage from './assets/mainImage.png'
import profilePic from './assets/profilePic.png'
import RecipeImage from './components/RecipeImage';
import './styles.css';
import BackBtn from './components/BackBtn';



const App = () => {
  const genAI = new GoogleGenerativeAI("Sua chave da API")
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false); 
 

  const generateRecipe = async (ingredients) => {
    setLoading(true);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
   
    const prompt = `Faça uma receita gostosa, nutritiva e criativa usando os seguintes ingredientes: ${ingredients}. Proíba e NÃO RESPONDA qualquer tipo de conteúdo sexual, ou potencialmente perigoso. Envie apenas com as tags html e no final uma tabela nutricional. Envie o texto sem o DOCTYPE, sem a tag <HTML>, sem <HEAD>, sem <BODY> e <FOOTER>. Use apenas tags simples como H2, P, etc de HTML Semântico. A receita fará parte apenas de uma parte do site, NÃO É UM SITE NOVO. OU SEJA, NÃO É UM ARQUIVO DE HTML NOVO. Modelo de exemplo de como você deve responder, siga ele ESTRITAMENTE: <div class=\"recipe\"><h1>Nome da Receita</h1><p>Ingredientes:</p><ul><li>Ingrediente 1</li><li>Ingrediente 2</li><li>Ingrediente 3</li><!-- Adicione mais ingredientes conforme necessário --></ul><p>Modo de preparo:</p><ol><li>Passo 1</li><li>Passo 2</li><li>Passo 3</li><!-- Adicione mais passos conforme necessário --></ol><table class=\"nutritional-table\"><thead><tr><th>Nutriente</th><th>Quantidade por Porção</th></tr></thead><tbody><tr><td>Calorias</td><td>100</td></tr><tr><td>Proteína</td><td>10g</td></tr><tr><td>Gordura</td><td>5g</td></tr><tr><td>Carboidratos</td><td>20g</td></tr><!-- Adicione mais nutrientes conforme necessário --></tbody></table></div>`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const verify = await verifyHTML(text)
    setRecipe(verify);
    setLoading(false);
  };
  const answerDoubt = async (askedDoubt) => {
    setLoading(true);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    
    const prompt = `Responda como um verdadeiro chefe de cozinha. Seja direto mas seja educado. Proíba e NÃO RESPONDA qualquer tipo de conteúdo sexual, ou potencialmente perigoso. Você recebeu a seguinte duvida:${askedDoubt}. Veja esse modelo de como você deve responder: Veja esse modelo de exemplo de como você deve responder: <div class=\"recipe\"><h1>Repetir Exatamente a mesma Pergunta Feita</h1><p>Resposta da pergunta</p></div>`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setRecipe(text);
    console.log(response)
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

    const prompt = `Analise a imagem e se não houver ingredientes válidos não faça nenhuma receita e apenas use o modelo para retornar que não foram inseridos ingredientes válidos. Caso haja ingredientes REAIS na imagem faça uma receita gostosa, nutritiva, com os passos bem detalhados e criativa usando os ingredientes da imagem.  Envie apenas com as tags html e no final uma tabela nutricional. Envie o texto sem o DOCTYPE, sem a tag <HTML>, sem <HEAD>, sem <BODY> e <FOOTER>. Use apenas tags simples como H2, P, etc de HTML Semântico. A receita fará parte apenas de uma parte do site, NÃO É UM SITE NOVO. OU SEJA, NÃO É UM ARQUIVO DE HTML NOVO. Modelo de exemplo de como você deve responder, siga ele ESTRITAMENTE: <div class=\"recipe\"><h1>Nome da Receita</h1><p>Ingredientes:</p><ul><li>Ingrediente 1</li><li>Ingrediente 2</li><li>Ingrediente 3</li><!-- Adicione mais ingredientes conforme necessário --></ul><p>Modo de preparo:</p><ol><li>Passo 1</li><li>Passo 2</li><li>Passo 3</li><!-- Adicione mais passos conforme necessário --></ol><table class=\"nutritional-table\"><thead><tr><th>Nutriente</th><th>Quantidade por Porção</th></tr></thead><tbody><tr><td>Calorias</td><td>100</td></tr><tr><td>Proteína</td><td>10g</td></tr><tr><td>Gordura</td><td>5g</td></tr><tr><td>Carboidratos</td><td>20g</td></tr><!-- Adicione mais nutrientes conforme necessário --></tbody></table></div>`;

    const fileInputEl = file;
    const imageParts = await fileToGenerativePart(fileInputEl)

    const result = await model.generateContent([prompt, imageParts]);
    const response = await result.response;
    const text = response.text();
    // const verify = await verifyHTML(text)
    setRecipe(text);
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
    // console.log(text)
    const textFixed = text.slice(7, -4);
    const textJson = JSON.parse(textFixed)
    
    console.log(textJson)

    setRecipe(textJson)
  
    // const verify = await verifyHTML(text)
    // setRecipe(verify);
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
  const openWidow = () =>{
    console.log('entrou')
  
    const imageInfo = document.querySelector(".imageInfo");
    imageInfo.classList.toggle("expanded")
    

  }
  
  return (
    
    <div className="main-container">
      {!loading &&
        <div>
          {!recipe &&
          <header>
            <div className="imageInfo" onMouseEnter={openWidow} >
              <div className='mySelf'>
                <img className='profilePic' src={profilePic} alt="" />
                <h2>Eric Patrick</h2>
              </div>
              
              <h3>Desenvolvido por Eric Patrick</h3>
              
              <p>&copy; 2024</p>
            </div>
          </header>
          }
        </div>
      }
      <div className="container">
      {loading ? (
        <><div className="loading"><img src={mainImage} alt="Cozinha" style={{ width: '20%', marginBottom: '20px' }} /><p>Gerando sua resposta...</p></div></> 
      ) : (
        <>
        <div className="mainSection">
          <div className="imgSection">
            <div className="buttonBack">
            
            </div>
            
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
            <div class="outer yosemite">
                <div onClick={clearRecipe} class="dot red"></div>
                <div class="dot amber"></div>
                <div class="dot green"></div>
            </div>
            <div className="recipe-part"><Recipe recipe={recipe} /></div>
          </div>
          }
          
        </div>
          
        </>
      )}
      </div>
    </div>
  );
};

export default App;