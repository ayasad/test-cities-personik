import React from "react"
interface IButtonProps {
    handleButtonClick: () => void,
    buttonText: string
}
let Button: React.FC<IButtonProps> = ({handleButtonClick,buttonText}: IButtonProps) => {

    return (
    <>
        <button className='px-4 py-2 bg-violet-600 m-auto text-white rounded-md text-base' onClick={handleButtonClick}>{buttonText}</button>
    </>)
}
Button = React.memo(Button)
export default Button 