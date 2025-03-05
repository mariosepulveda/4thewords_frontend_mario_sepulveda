import { useState } from "react";

const TableGlobalFilter = ({ onFilterChange }) => {
    const [filter, setFilter] = useState("");

    const handleFilterChange = (e) => {
        const value = e.target.value.toLowerCase();
        setFilter(value);
        onFilterChange(value); // Llama a la función del padre con el valor del filtro
    };

    return (
        <div className=" w-1/2">
            <input
                type="text"
                placeholder="Buscar en todas las columnas..."
                value={filter}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-lg text-sm"
            />
        </div>
    );
};

export default TableGlobalFilter;
