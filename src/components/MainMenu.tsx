import Button from "./Button";

interface MainMenuProps {
  handleButtonClick: () => void;
}

const MainMenu : React.FC<MainMenuProps> = ({ handleButtonClick }: MainMenuProps): JSX.Element =>{
  
  return (<>
    <div className=' bg-white w-[576px] max-w-[100%] flex flex-col items-start text-left  pb-12 rounded-xl' >
    
    <h1 className=' m-auto my-4'><b>Игра в города на время</b></h1>
    <hr className='w-full border border-y-2'></hr>
    <div className='flex flex-col justify-around m-6 gap-6 px-6 text-sm'>
        <p>Цель: Назвать как можно больше реальных городов.</p>
        <ul className='list-disc list-outside'>
            <li><span>Запрещается повторение городов.</span></li>
            <li><span>Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен назвать город на букву стоящую перед ъ или ь знаком.</span></li>
            <li><span>Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается проигравшим</span></li>
        </ul>
        <Button handleButtonClick={handleButtonClick} buttonText="Начать игру" />
    </div>
      
    </div>
  </>) 
    
}

export default MainMenu
