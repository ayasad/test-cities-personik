import icon from '../assets/Icon.svg';
interface IInputProps {
    onChange : (e: React.ChangeEvent<HTMLInputElement>)  => void,
    handleButtonClick: () => void,
    value: string,
    placeholder: () => string,
    disabledCondition: boolean,
    handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    additionalClasses?: string
}
const Input: React.FC<IInputProps> = ({onChange, handleButtonClick,value,placeholder,disabledCondition,...props}: IInputProps) => {

    return (
    <>
        <div className='w-[544px] max-w-[100%] bg-gray-100 p-3 rounded-md mb-4 flex justify-between items-center' >
            <input className=' bg-gray-100 w-[477px] max-w-[90%] outline-none' type="text" placeholder={placeholder()} value={value} onChange={onChange} onKeyDown={props.handleKeyDown} disabled={disabledCondition}/>
            <button className={`w-8 h-8  text-white rounded-md flex justify-center items-center ${props.additionalClasses}`} disabled={disabledCondition} onClick={handleButtonClick}><img src={icon} alt="Отправить"/></button>
        </div>
    </>)
}



export default Input