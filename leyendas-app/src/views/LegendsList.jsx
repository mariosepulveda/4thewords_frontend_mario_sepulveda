import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiPencilAlt, HiTrash } from "react-icons/hi"; // Importamos los íconos de edición y eliminación
import TableGlobalFilter from "../components/TableGlobalFilter";

const LegendsList = ({ legends, onNewLegend, onEditLegend, onDeleteLegend }) => {
    //const navigate = useNavigate();
    const [filterText, setFilterText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Cantidad de elementos por página

    const handleFilterChange = (value) => setFilterText(value);

    const filteredLegends = legends.filter((legend) =>
        Object.values(legend).some(
            (val) => val?.toString().toLowerCase().includes(filterText)
        )
    );

    // Calcular el total de páginas
    const totalPages = Math.ceil(filteredLegends.length / itemsPerPage);
    // Obtener los elementos para la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredLegends.slice(indexOfFirstItem, indexOfLastItem);

    const URL_IMAGES = 'http://localhost:8080/';

    // Funciones para cambiar de página
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="container mx-auto p-6 bg-[#FFF1DB] rounded-lg shadow-md">
            {/* Botón para agregar nueva leyenda */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#0d5988]">Lista de Leyendas</h2>
                <TableGlobalFilter onFilterChange={handleFilterChange} />
                <button
                    onClick={onNewLegend}
                    className="bg-[#8fca23] hover:bg-[#7cae1e] text-[102F42] text-sm font-bold py-2 px-4 rounded-lg transition"
                >
                    Nueva Leyenda
                </button>
            </div>

            {/* Tabla de leyendas */}
            <div className="overflow-x-auto h-[11/12] overflow-y-auto border rounded-lg">
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
                        {currentItems.length > 0 ? (
                            currentItems.map((legend, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{legend.nombre}</td>
                                    <td className="py-2 px-4">{legend.descripcion}</td>
                                    <td className="py-2 px-4">{legend.categoria}</td>
                                    <td className="py-2 px-4">{legend.provincia}</td>
                                    <td className="py-2 px-4">{legend.canton}</td>
                                    <td className="py-2 px-4">{legend.distrito}</td>
                                    <td className="py-2 px-4">
                                        <img
                                            src={`${URL_IMAGES}${legend.imagen_url}`}
                                            alt={legend.nombre}
                                            className="w-16 h-16 rounded-full object-cover"
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

                            {/* Paginación */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                >
                    Anterior
                </button>
                <span className="text-gray-700">Página {currentPage} de {totalPages}</span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                >
                    Siguiente
                </button>
            </div>
            </div>
        </div>
    );
};

export default LegendsList;
