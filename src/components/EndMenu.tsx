import Button from "./Button"

interface IEndMenuProps{
    lastWord: string
    playerWon: boolean
    citiesCount: number
    restartGame: () => void
}
const EndMenu : React.FC<IEndMenuProps> = ({lastWord, playerWon, citiesCount, restartGame}: IEndMenuProps): JSX.Element => {
    return (
    <>
        <div className='w-full flex flex-col px-4 items-center text-center justify-around gap-4 p-4 text-xl'>
            {playerWon ?
            <div>
                <h1>Поздравляем тебя с победой!</h1>
                <p>Твой противник не вспомнил нужный город!</p>
                
            </div>
            :
            <div>
                <p>К сожалению твое время вышло!</p>
                <p>Твой противник победил!</p>
            </div>
            }
            <p className={`${playerWon ? 'text-green-600' : 'text-red-600'}`}>
                00:00
            </p>
            
            {lastWord === undefined ? <p>Ты не назвал город</p> :
            <>
                <div>
                    <p>Всего было перечислено городов: {citiesCount}</p>
                    <p>Очень не плохой результат!</p>
                </div>
                <div>
                    <p>Последний город названный победителем</p>
                    <p className="text-xl"><b>{lastWord}</b></p>
                </div>
            </>
            }
                
            
            <Button handleButtonClick={restartGame} buttonText="Начать новую игру" />
            
        </div>
    </>)

}

export default EndMenu