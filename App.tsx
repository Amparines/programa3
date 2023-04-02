
import { useEffect, useState } from 'react';
import { HangImage } from './componentes/HangImage';
import {letters} from'./helpers/letters';
import {getRandonWord}from'./helpers/getRandonWord'
import './App.css';

function App() {
  const [word,setword] =useState(getRandonWord());
  const [hiddenWord,setHiddenWord]=useState('_ '.repeat(word.length));
  const [attempts,setAttemps]=useState(0);
  const [lose,setlose]=useState(false);
  const [won,setwon]=useState(true);
//determinar si la persona perdio
useEffect(()=>{
  if(attempts >= 9){
   setlose(true); 
  }
 },[attempts]);


//determinar si la persona gano
useEffect(()=>{
 //console.log(hiddenWord);//_ _ _ _ _ _ _ _ _ 
 const currenHiddenWord=hiddenWord.split(' ').join('');
if (currenHiddenWord=== word){
  setwon(true);
}

},[hiddenWord])


const checkLetter=(letter:string)=>{
  if(lose)return;
  if(won)return;
  if ( !word.includes(letter) ) {
    setAttemps( Math.min( attempts + 1, 9 )  );
    return;
}

const hiddenWordArray = hiddenWord.split(' ');

for( let i = 0; i < word.length; i++ ) {
  if ( word[i] === letter ) {
    
  }
  hiddenWordArray[i] = letter;
}
  

const newGame = () => {
  const newWord = getRandonWord();
  setword( newWord );
  setHiddenWord( '_ '.repeat( newWord.length ) );
  setAttemps( 0 );
  setlose( false );
  setwon( false );


}

return(
  <div className="App">
    {/*Imagenes*/}
    <HangImage imageNumber={attempts}/>
   
    {/*Palabra oculta*/}
    <h3>{hiddenWord}</h3>

    {/*Contador de intentos*/}
    <h3>Intentos:{attempts}</h3>

    {/*mensaje si Perdio*/}
    {
      (lose)
      ?<h2>Perdio{word}</h2>
      :''
    }
     {/*mensaje si Gano*/}
{
      (won)
      ?<h2>Felicidades,usted ganó</h2>
      :''
}

    {/*Botones de letras*/}
    {
      letters.map((letter)=>(
        <button>
          onClick={checkLetter (letter)}
       
          key={letter}
          {letter}
          </button>
       ))
      }
       
    
       
  <br /><br />
          <button onClick={ newGame } >¿Nuevo juego?</button>
  

  </div>
);
      };
      

export default App;
