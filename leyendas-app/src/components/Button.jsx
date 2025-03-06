const Button = ({ children, type = "button", variant = "primary", onClick, className = "", disabled=false}) => {
    // Definir clases según el tipo de botón
    const baseStyles = "font-bold py-2 px-4 rounded-lg transition duration-200";
    const variants = {
        primary: "bg-[#8fca23] hover:bg-[#7cae1e] text-[#0d5988] font-light",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white font-light",
        danger: "bg-red-500 hover:bg-red-600 text-white font-light",
        transparent:"bg-transparent "
    };

    const disabledStyles = "opacity-30 cursor-not-allowed";

    return (
        <button 
            type={type} 
            onClick={onClick} 
            className={`${baseStyles} ${variants[variant]} ${className}  ${disabled ? disabledStyles : ""}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
