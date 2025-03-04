const Button = ({ children, type = "button", variant = "primary", onClick, className = "" }) => {
    // Definir clases según el tipo de botón
    const baseStyles = "font-bold py-2 px-4 rounded-lg transition duration-200";
    const variants = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
    };

    return (
        <button 
            type={type} 
            onClick={onClick} 
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
