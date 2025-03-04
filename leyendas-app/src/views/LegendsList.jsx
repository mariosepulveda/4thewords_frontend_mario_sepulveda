import React from "react";
import { useNavigate } from "react-router-dom";
import { HiPencilAlt, HiTrash } from "react-icons/hi"; // Importamos los íconos de edición y eliminación

const LegendsList = ({ legends, onNewLegend, onEditLegend, onDeleteLegend }) => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto p-6 bg-[#FFF1DB] rounded-lg shadow-md">
            {/* Botón para agregar nueva leyenda */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#0d5988]">Lista de Leyendas</h2>
                <button
                    onClick={onNewLegend}
                    className="bg-[#8fca23] hover:bg-[#7cae1e] text-[102F42] text-sm font-bold py-2 px-4 rounded-lg transition"
                >
                    Nueva Leyenda
                </button>
            </div>

            {/* Tabla de leyendas */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Nombre</th>
                            <th className="py-2 px-4 border-b text-left">Descripción</th>
                            <th className="py-2 px-4 border-b text-left">Categoría</th>
                            <th className="py-2 px-4 border-b text-left">Provincia</th>
                            <th className="py-2 px-4 border-b text-left">Cantón</th>
                            <th className="py-2 px-4 border-b text-left">Distrito</th>
                            <th className="py-2 px-4 border-b text-left">Imagen</th>
                            <th className="py-2 px-4 border-b text-left">Fecha Creación</th>
                            <th className="py-2 px-4 border-b text-left">Acciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {legends.length > 0 ? (
                            legends.map((legend, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{legend.nombre}</td>
                                    <td className="py-2 px-4">{legend.descripcion}</td>
                                    <td className="py-2 px-4">{legend.categoria}</td>
                                    <td className="py-2 px-4">{legend.provincia}</td>
                                    <td className="py-2 px-4">{legend.canton}</td>
                                    <td className="py-2 px-4">{legend.distrito}</td>
                                    <td className="py-2 px-4">
                                        <img
                                            src={legend.img_url}
                                            alt={legend.nombre}
                                            className="w-16 h-16 rounded object-cover"
                                        />
                                    </td>
                                    <td className="py-2 px-4">{new Date(legend.fecha_creacion).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 flex space-x-2">
                                        <HiPencilAlt
                                            className="text-[#30b3ee] hover:text-[#2595c7] cursor-pointer"
                                            size={20}
                                            onClick={() => onEditLegend(legend.id)}
                                        />
                                        <HiTrash
                                            className="text-[#d73756] hover:text-[#c42f4c] cursor-pointer"
                                            size={20}
                                            onClick={() => onDeleteLegend(legend.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-gray-500">
                                    No hay leyendas disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LegendsList;
