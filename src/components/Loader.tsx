import { useState, useEffect, useRef } from 'react';

interface LoaderProps {
  resetLoader: boolean;
}
const Loader: React.FC<LoaderProps> = ({ resetLoader } : LoaderProps): JSX.Element => {
  const totalTime = 120; // Общее время в секундах
  const [progressValue, setProgressValue] = useState<number>(100);
  const intervalRef = useRef <number | undefined>(undefined);

  useEffect(() => {
    clearInterval(intervalRef.current);
    setProgressValue(100);


      intervalRef.current = setInterval(() => {
        setProgressValue((prevValue) => {
          if (prevValue === 0) {
            clearInterval(intervalRef.current);
            return prevValue;
          }
          return prevValue - 1;
        });
      }, totalTime * 1000 / 100); // Интервал обновления прогресса (в миллисекундах)
    
  }, [resetLoader]);

  return (
    <div className="h-1 w-full bg-gray-200">
      <div
        className="h-1 bg-violet-300"
        style={{ width: `${progressValue}%` }}
      ></div>
    </div>
  );
}

export default Loader;