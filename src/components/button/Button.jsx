import style from "./Button.module.css";

const Button = ({ children, onClick, className }) => {
    return (
        <button onClick={() => { onClick(); }} className={`${style.estilo_padrao} ${className}`}>
            {children}
        </button>
    )
}

export default Button;