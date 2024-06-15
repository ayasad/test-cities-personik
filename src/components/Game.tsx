import { useState,useRef, useEffect, useCallback } from 'react'
import Loader from './Loader'
import styles from './Game.module.css'
import citiesText  from '../assets/cities.ts';
import Timer from './Timer';
import EndMenu from './EndMenu';
import Input from './Input';

interface IFinished{
  isFinished: boolean
  winner: boolean
}

const Game: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [valuesArray, setValuesArray] = useState<string[]>([]);
  const listContainerRef = useRef<HTMLUListElement>(null!);
  const [playerTurn, setPlayerTurn] = useState<boolean>(true)
  const [cities, setCities] = useState<string[]>([]);
  const [startsWithLetter, setStartsWithLetter] = useState<string>('');
  const [finished, setFinished] = useState<IFinished>({isFinished: false, winner: false});

  useEffect(() => {
    const citiesArray : string[] = citiesText.split('\n').filter((city: string) => city.trim() !== '');
    setCities(citiesArray);
  }, []);

  useEffect(() => {
    if(valuesArray.length !== 0) {
      setPlayerTurn(!playerTurn)
    }
    
  }, [valuesArray]);

  useEffect(() => {
    if (listContainerRef.current) {
      const lastChild = listContainerRef.current.lastChild as HTMLDivElement;
      lastChild.scrollIntoView({ behavior: 'smooth' });
    }
  }, [playerTurn]);

  function simulateRandomResponse(letter:string) {

    const getRandomElement = (): string | null => {
      const filteredArray = cities.filter(
        (element: string) =>
          !valuesArray.includes(element) && element.startsWith(letter)
      );
    
      if (filteredArray.length === 0) {
        return null;
      }
      return filteredArray[Math.floor(Math.random() * filteredArray.length)] as string;
  
    };
  
    const randomInterval = Math.floor(Math.random() * (21 - 10 + 1)) + 10;
  
    setTimeout(() => {
      const randomElement = getRandomElement();
      if(randomElement === null) {
        return;
      }
      setValuesArray((prevArray) => [...prevArray, randomElement]);


      let lastLetter = randomElement[randomElement.length - 1].toUpperCase();
      if(lastLetter === 'Ъ' || lastLetter === 'Ь') {
        lastLetter = randomElement[randomElement.length - 2].toUpperCase();
      }
      setStartsWithLetter(lastLetter);
    }, randomInterval * 1000);

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) : void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addValueToArray();
    }
  };

  const handleButtonClick = useCallback( () : void => {
    addValueToArray();
  },[])

  const placeholder = () : string => {
    return `${ valuesArray.length === 0 ? 'Напишите любой город, например: Где вы живете?' : playerTurn ? `Знаете город на букву "${startsWithLetter}"?` : "Ожидаем ответ соперника..." }`
  }

  const addValueToArray = () : void => {
    if (inputValue.trim() !== '' && !valuesArray.includes(inputValue.trim()) && inputValue.trim().startsWith(startsWithLetter)) {
      setValuesArray((prevArray) => [...prevArray, inputValue.trim()]);
      setInputValue('');

      

      let lastLetter = inputValue[inputValue.length-1].toUpperCase();
      if(lastLetter === 'Ъ' || lastLetter === 'Ь') {
        lastLetter = inputValue[inputValue.length-2].toUpperCase();
      }

      setStartsWithLetter(lastLetter);
      simulateRandomResponse(lastLetter);

    }else if(valuesArray.length === 0) {
      setValuesArray((prevArray) => [...prevArray, inputValue.trim()]);
      setInputValue('');

      let lastLetter = inputValue[inputValue.length-1].toUpperCase();
      if(lastLetter === 'Ъ' || lastLetter === 'Ь') {
        lastLetter = inputValue[inputValue.length-2].toUpperCase();
      }

      setStartsWithLetter(lastLetter);simulateRandomResponse(lastLetter);
    }else if(inputValue.trim() === ''){
      alert('Заполните поле')
    }else if(valuesArray.includes(inputValue.trim())){
      alert('Данное слово уже было')
    }else if(!inputValue.trim().startsWith(startsWithLetter)){
      alert('Слово должно начинаться с буквы: ' + startsWithLetter)
    }

    
  };

  const restartGame = useCallback(():void => {
    setValuesArray([]);
    setStartsWithLetter('');
    setInputValue('');
    setPlayerTurn(true);
    setFinished({isFinished: false, winner: false});
  },[]);

  const endGame = useCallback(():void => {
    setFinished({isFinished: true, winner: playerTurn});
  },[]);

  return (
  <>
    <div className=' bg-white w-[576px] max-w-[100%]  flex flex-col items-center text-left  rounded-xl text-base' >
      { !finished.isFinished ? 
      <>
      <div className='w-full flex justify-between px-4 items-center '>
        <h1 className='my-4'>
          {valuesArray.length == 0 ? "Игра в города на время" : 
            playerTurn ? "Сейчас ваша очередь" : "Сейчас очередь соперника"
          }
        </h1>
        <span className='text-xl'><Timer resetTimer={playerTurn} endGame={endGame}/></span>
      </div>
      <Loader resetLoader={playerTurn}/>
      {valuesArray.length > 0 ? 
        <div className='h-[320px] w-[576px] max-w-[100%] flex flex-col justify-between'>
          <div className={`${styles.scroll} `} >
            <ul ref={listContainerRef} className='w-full h-full flex flex-col py-5 px-4 gap-2 ' >
              {valuesArray.map((value, index) => (
                <li key={index} className={index % 2 === 0 ? 'bg-violet-500 ml-auto px-3 py-1.5 rounded-tl-lg rounded-tr-lg rounded-bl-lg text-white' : 'bg-violet-50 mr-auto px-3 py-1.5 rounded-tl-lg rounded-tr-lg rounded-br-lg text-black'}>{value}</li>
              ))}
            </ul>
          </div>
          <div className='text-center mt-4 mb-5 text-gray-400 text-sm' >Всего перечислено городов: {valuesArray.length}</div>
        </div>
         :
        <div className='h-[320px] flex justify-center items-center text-gray-400 text-sm'>Первый участник вспоминает города...</div>
        }
      
      
      <Input  handleButtonClick={handleButtonClick} value={inputValue} onChange={handleInputChange} handleKeyDown={handleKeyDown} disabledCondition={!playerTurn} placeholder={placeholder} additionalClasses={playerTurn ? 'bg-violet-600' : 'bg-gray-400'}></Input>
      </>
      :
      <EndMenu lastWord={valuesArray[valuesArray.length-1]} playerWon={!finished.winner} citiesCount={valuesArray.length} restartGame={restartGame}/>
      }
      
      
    </div>
  </>) 
    
}

export default Game
