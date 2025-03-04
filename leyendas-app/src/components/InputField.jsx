const InputField = ({ label, type = "text", name, value, onChange, className = "", ...props }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
            {type === "textarea" ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-lg ${className}`}
                    {...props}
                />
            ) : type === "file" ? (
                <input
                    type="file"
                    name={name}
                    onChange={onChange} //no recible value en file inputs
                    className={`w-full px-3 py-2 border rounded-lg ${className}`}
                    {...props}
                />
            ) :  (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-lg ${className}`}
                    {...props}
                />
            )}
        </div>
    );
};

export default InputField;
