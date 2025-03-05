import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLeyenda } from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";

const NewLegend = () => {
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
    

    const handleChange = (e) => {
        if (e.target.type === "file") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] }); // guarda solo el primer archivo
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
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
        
        try {
            const result = await createLeyenda(formDataToSend);
            console.log("Respuesta del servidor:", result);
            alert("Imagen subida con éxito");
            navigate("/"); // Redirigir si es necesario
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        }
    };

    /**createLeyenda() */
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-[#fff1db99] p-6 rounded-lg shadow-lg w-3/4">
                <h2 className="text-2xl text-[#0d5988] font-bold mb-4 text-center">Nueva Leyenda</h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>

                    {/* Campo Nombre */}
                    <InputField
                        label="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />

                    {/* Campo Categoria */}
                    <InputField
                        label="Categoría"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                    />

                    {/* Campo Provincia */}
                    <InputField
                        label="Provincia"
                        name="provincia"
                        value={formData.provincia}
                        onChange={handleChange}
                    />

                    {/* Campo Cantón */}
                    <InputField
                        label="Cantón"
                        name="canton"
                        value={formData.canton}
                        onChange={handleChange}
                    />

                    {/* Campo Distrito */}
                    <InputField
                        label="Distrito"
                        name="distrito"
                        value={formData.distrito}
                        onChange={handleChange}
                    />

                    
                    {/* Campo Fecha */}
                    <InputField
                        label="Fecha"
                        type="date"
                        name="fecha_creacion"
                        value={formData.fecha_creacion}
                        onChange={handleChange}
                    />

                    {/* Campo Descripción (Usa textarea) */}
                    <InputField
                        label="Descripción"
                        type="textarea"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="md:col-span-2"
                    />
                    
                    {/* Campo Imagen (Usa Field) */}
                    <InputField
                        label="Imagen"
                        type="file"
                        name="imagen"
                        value={formData.imagen}
                        onChange={handleChange}
                        className="md:col-span-2"
                    />

                    {/* Botones (Ocupan las 2 columnas en pantallas grandes) */}
                    <div className="flex justify-evenly md:col-span-2">
                        <Button type="submit" variant="primary">
                            Guardar
                        </Button>
                        <Button variant="secondary" onClick={() => navigate("/")}>
                            Cancelar
                        </Button>

                    </div>
                </form>

            </div>
        </div>
    );
};

export default NewLegend;
