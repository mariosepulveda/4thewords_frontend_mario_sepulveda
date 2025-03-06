import React, { useState } from 'react';

const InputField = ({ label, type = "text", name, value, onChange, className = "", required,...props }) => {

    const [imagePreview, setImagePreview] = useState(null);

    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        // Call the onChange prop if it exists to handle other operations
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
            {type === "textarea" ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-lg ${className}`}
                    required={required}
                    {...props}
                />
            ) : type === "file" ? (
                    <>
                        <input
                            type="file"
                            name={name}
                            onChange={handleImageChange} //no recible value en file inputs
                            className={`w-full px-3 py-2 bg-white border rounded-lg ${className}`}
                            required={required}
                            {...props}
                        />
                        {imagePreview && (
                            <div className="mt-2">
                                <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius:'50%'}} />
                            </div>
                        )}
                    </>
            ) :  (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-lg ${className}`}
                    required={required}
                    {...(type === "date" ? { max: today } : {})} // Limitar fechas futuras
                    {...props}
                />
            )}
        </div>
    );
};

export default InputField;
