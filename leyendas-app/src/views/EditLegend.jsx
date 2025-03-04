import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLeyendaById, updateLeyenda } from "../services/api";

const EditLegend = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [legend, setLegend] = useState({
        nombre: "",
        descripcion: "",
        categoria: "",
    });

    useEffect(() => {
        const fetchLegend = async () => {
            const data = await getLeyendaById(id);
            setLegend(data);
        };
        fetchLegend();
    }, [id]);

    const handleChange = (e) => {
        setLegend({ ...legend, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateLeyenda(id, legend);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Editar Leyenda</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={legend.nombre}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
                        <textarea
                            name="descripcion"
                            value={legend.descripcion}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        ></textarea>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLegend;
