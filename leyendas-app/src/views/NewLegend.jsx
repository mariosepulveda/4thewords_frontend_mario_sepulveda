import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLeyenda } from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewLegend = ({isEditMode = false}) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre:"",
        categoria:"",
        provincia:"",
        canton:"",
        distrito:"",
        descripcion:"",
        fecha_creacion:"",
        imagen:null
    });
    
    // Estado para manejar errores
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        if (e.target.type === "file") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] }); // guarda solo el primer archivo
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Validación del formulario
    const validate = () => {
        let newErrors = {};
        if (isEditMode) return true; // Si es edición, no validamos campos requeridos

        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = "Este campo es requerido";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // Enviar el formulario al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        formDataToSend.append("nombre", formData.nombre);
        formDataToSend.append("categoria", formData.categoria);
        formDataToSend.append("provincia", formData.provincia);
        formDataToSend.append("canton", formData.canton);
        formDataToSend.append("distrito", formData.distrito);
        //formDataToSend.append("fecha_creacion", formData.fecha_creacion);
        formDataToSend.append("descripcion", formData.descripcion);
        Object.keys(formData).forEach(key => {
            if (key === "fecha_creacion") {
                formDataToSend.append(key, formData[key] ? new Date(formData[key]).toISOString() : new Date().toISOString());
            }
        });

        if (formData.imagen) {
            formDataToSend.append("imagen", formData.imagen);
        }

        if (!validate()) {
            toast.error("Por favor, completa todos los campos");
            return;
        }
        
        try {
            await createLeyenda(formDataToSend);
            navigate("/",{ state: { mensaje: "¡Leyenda almacenada exitósamente!", success:true } });
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            toast.error("Error al guardar la leyenda");
            
        }
    };

    /**createLeyenda() */
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-[#fff1db99] p-6 rounded-lg shadow-lg w-3/4">
                <h2 className="text-2xl text-[#0d5988] font-bold mb-4 text-center">Nueva Leyenda</h2>
                <ToastContainer />
                
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>

                    {/* Campo Nombre */}
                    <InputField
                        label="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        error={errors.nombre}
                        required={!isEditMode}
                    />

                    {/* Campo Categoria */}
                    <InputField
                        label="Categoría"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        error={errors.categoria}
                        required={!isEditMode}
                    />

                    {/* Campo Provincia */}
                    <InputField
                        label="Provincia"
                        name="provincia"
                        value={formData.provincia}
                        onChange={handleChange}
                        error={errors.provincia}
                        required={!isEditMode}
                    />

                    {/* Campo Cantón */}
                    <InputField
                        label="Cantón"
                        name="canton"
                        value={formData.canton}
                        onChange={handleChange}
                        error={errors.canton}
                        required={!isEditMode}
                    />

                    {/* Campo Distrito */}
                    <InputField
                        label="Distrito"
                        name="distrito"
                        value={formData.distrito}
                        onChange={handleChange}
                        error={errors.distrito}
                        required={!isEditMode}
                    />

                    
                    {/* Campo Fecha */}
                    <InputField
                        label="Fecha"
                        type="date"
                        name="fecha_creacion"
                        value={formData.fecha_creacion}
                        onChange={handleChange}
                        error={errors.fecha_creacion}
                        required={!isEditMode}
                    />

                    {/* Campo Descripción (Usa textarea) */}
                    <InputField
                        label="Descripción"
                        type="textarea"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        error={errors.descripcion}
                        className="md:col-span-2"
                        required={!isEditMode}
                    />
                    
                    {/* Campo Imagen (Usa Field) */}
                    <InputField
                        label="Imagen"
                        type="file"
                        name="imagen"
                        value={formData.imagen}
                        onChange={handleChange}
                        error={errors.imagen}
                        className="md:col-span-2"
                        required={!isEditMode}
                    />

                    {/* Botones (Ocupan las 2 columnas en pantallas grandes) */}
                    <div className="flex justify-evenly md:col-span-2">
                        <Button type="submit" variant="primary">
                            Guardar
                        </Button>
                        <Button variant="secondary" onClick={() => navigate("/",{ state: { mensaje: "", success:false } })}>
                            Cancelar
                        </Button>

                    </div>
                </form>

            </div>
        </div>
    );
};

export default NewLegend;
