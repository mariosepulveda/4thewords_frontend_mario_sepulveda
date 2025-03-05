import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLeyendaById, updateLeyenda } from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";

const EditLegend = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [legend, setLegend] = useState({
        nombre: "",
        categoria: "",
        provincia: "",
        canton: "",
        distrito: "",
        fecha_creacion: "",
        descripcion: "",
        imagen: null
    });

    useEffect(() => {
        const fetchLegend = async () => {
            try {
                const response = await getLeyendaById(id);
                const leyenda = response;        
                setLegend({
                    ...leyenda,
                    fecha_creacion: leyenda.fecha_creacion ? leyenda.fecha_creacion.split("T")[0] : "", // Extrae solo 'YYYY-MM-DD'
                });
                // const data = await getLeyendaById(id);
                // setLegend(data);
            } catch (error) {
                console.error("Error cargando la leyenda:", error);
            }
        };
        fetchLegend();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setLegend((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value
        }));
        // setLegend({ ...legend, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateLeyenda(id, legend);
            navigate("/");
        } catch (error) {
            console.error("Error actualizando la leyenda:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-[#fff1db99] p-6 rounded-lg shadow-lg w-3/4">
                <h2 className="text-2xl text-[#0d5988] font-bold mb-4 text-center">Editar Leyenda</h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>

                    <InputField label="Nombre" name="nombre" value={legend.nombre} onChange={handleChange} />
                    <InputField label="Categoría" name="categoria" value={legend.categoria} onChange={handleChange} />
                    <InputField label="Provincia" name="provincia" value={legend.provincia} onChange={handleChange} />
                    <InputField label="Cantón" name="canton" value={legend.canton} onChange={handleChange} />
                    <InputField label="Distrito" name="distrito" value={legend.distrito} onChange={handleChange} />
                    <InputField label="Fecha" name="fecha_creacion" type="date" value={legend.fecha_creacion} onChange={handleChange} />

                    <InputField
                        label="Descripción"
                        type="textarea"
                        name="descripcion"
                        value={legend.descripcion}
                        onChange={handleChange}
                        className="md:col-span-2"
                    />

                    {/* Campo de imagen */}
                    <InputField
                        label="Imagen"
                        type="file"
                        name="imagen"
                        onChange={handleChange}
                        className="md:col-span-2"
                    />

                    {/* Botones */}
                    <div className="flex justify-evenly md:col-span-2">
                        <Button type="submit" variant="primary">
                            Guardar cambios
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

export default EditLegend;
