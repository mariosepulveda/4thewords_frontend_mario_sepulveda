import React from "react";
import { useNavigate } from "react-router-dom";

const NewLegend = () => {
    const navigate = useNavigate();

    /**createLeyenda() */
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Nueva Leyenda</h2>

                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                        <input type="text" className="w-full px-3 py-2 border rounded-lg" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
                        <textarea className="w-full px-3 py-2 border rounded-lg"></textarea>
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
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewLegend;
