import { useCallback, useState} from 'react'
import Game from './components/Game'
import MainMenu from './components/MainMenu'
import './App.css'

const App : React.FC = () : JSX.Element => {
  const [showOtherComponent, setShowOtherComponent] = useState(false);

  
  const handleButtonClick = useCallback(() => {
    setShowOtherComponent(true);
  }, []);

  return (
    
    <div className='w-full h-full bg-gray-200 flex justify-center items-center box-border'>
      {!showOtherComponent ? ( 
        <MainMenu handleButtonClick={handleButtonClick} />
      ) :  (
        <Game />
      )}
    </div>
  );
}

export default App
