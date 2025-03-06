import React, { useState,useEffect} from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { HiPencilAlt, HiTrash } from "react-icons/hi"; // Importamos los íconos de edición y eliminación
import TableGlobalFilter from "../components/TableGlobalFilter";
import Button from "../components/Button";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LegendsList = ({ legends, onNewLegend, onEditLegend, onDeleteLegend }) => {
    //const navigate = useNavigate();
    const [filterText, setFilterText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Cantidad de elementos por página

    const location = useLocation();

    useEffect(() => {
        if (location.state?.success) {
            toast.success(location.state.mensaje);
            sessionStorage.removeItem("successMessage"); // Elimina el mensaje después de usarlo
        }
    }, [location]);


    const handleFilterChange = (value) => {
        setFilterText(value);
        setCurrentPage(1);
    };

    const filteredLegends = legends.filter((legend) =>
        Object.values(legend).some(
            (val) => val?.toString().toLowerCase().includes(filterText.toLocaleLowerCase())
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
            <ToastContainer autoClose={3000} />
            {/* Botón para agregar nueva leyenda */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-[#0d5988]">Lista de Leyendas</h2>
                <TableGlobalFilter onFilterChange={handleFilterChange} />
                
                <button data-tooltip-id="add-tooltip">
                <Button variant="primary" onClick={onNewLegend}>
                    <FaPlus className="w-4 h-4" />
                </Button>
                </button>


                <Tooltip id="add-tooltip" place="top" effect="solid">
                    Agregar nueva leyenda
                </Tooltip>
                
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
                                    <td className="py-2 px-4 space-x-2">
                                        <div className="flex">
                                        <button data-tooltip-id="add-tooltip-editar">
                                        <HiPencilAlt
                                            className="text-[#30b3ee] hover:text-[#2595c7] cursor-pointer"
                                            size={20}
                                            onClick={() => onEditLegend(legend.id)}
                                        />
                                        </button>
                                        <button data-tooltip-id="add-tooltip-eliminar">
                                        <HiTrash
                                            className="text-[#d73756] hover:text-[#c42f4c] cursor-pointer"
                                            size={20}
                                            onClick={() => onDeleteLegend(legend.id)}
                                        />
                                        </button>
                                        </div>
                                        <Tooltip id="add-tooltip-eliminar" place="top" effect="solid">
                                            Eliminar leyenda
                                        </Tooltip>
                                        <Tooltip id="add-tooltip-editar" place="top" effect="solid">
                                            Editar leyenda
                                        </Tooltip>
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
                <button data-tooltip-id="add-tooltip-anterior">
                <Button variant="transparent" onClick={prevPage} disabled={currentPage === 1}>
                    <FaArrowLeft className="w-5 h-5" />
                </Button>
                </button>
                <span className="font-inika text-base font-light text-[#0d5988]">Página {currentPage} de {totalPages}</span>
                <button data-tooltip-id="add-tooltip-siguiente">
                <Button variant="transparent" onClick={nextPage} disabled={currentPage === totalPages}>
                    <FaArrowRight className="w-5 h-5" />
                </Button>
                </button>

                    <Tooltip id="add-tooltip-anterior" place="top" effect="solid">
                        Anterior
                    </Tooltip>
                    <Tooltip id="add-tooltip-siguiente" place="top" effect="solid">
                        Siguiente
                    </Tooltip>
            </div>
            </div>
        </div>
    );
};

export default LegendsList;
