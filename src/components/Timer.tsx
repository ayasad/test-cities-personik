import { useState, useEffect, useRef, useCallback } from 'react';

interface TimerProps {
  resetTimer: boolean;
  endGame: () => void;
}
const Timer : React.FC<TimerProps> = ({ resetTimer, endGame } : TimerProps) : JSX.Element => {
  const [minutes, setMinutes] = useState<number>(2);
  const [seconds, setSeconds] = useState<number>(0);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    reset();
  }, [resetTimer]);

  const reset = useCallback(() : void => {
    clearInterval(intervalRef.current);
    setMinutes(2);
    setSeconds(0);
  },[intervalRef.current])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          clearInterval(intervalRef.current);
          endGame();
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [minutes, seconds]);

  return (
    <div>
      <p>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
    </div>
  );
};

export default Timer;