import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { getLeyendas, deleteLeyenda  } from "./services/api";
import Swal from "sweetalert2"; //libreria para el componente de confirmacion de la elimnación
import LegendsList from "./views/LegendsList";
import NewLegend from "./views/NewLegend";
import EditLegend from "./views/EditLegend";


function LegendsPage() {
  const [leyendas, setLeyendas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLeyendas();
      setLeyendas(data);
    };
    fetchData();
  }, []);

// Manejador del evento del boton  de eliminar 
  const handleDeleteLegend = async (id) => {
    //await deleteLeyenda(id);

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d73756",
      cancelButtonColor: "#30b3ee",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
  });

  if (result.isConfirmed) {
      try {
          await deleteLeyenda(id);
          setLeyendas(leyendas.filter(legend => legend.id !== id));
          Swal.fire("Eliminado", "La leyenda ha sido eliminada.", "success");
      } catch (error) {
          Swal.fire("Error", "Hubo un problema al eliminar la leyenda.", "error");
      }
  }
};

  const handleEditLegend = (legend) => {
    console.log("Editando:", legend);
    navigate(`/editar-leyenda/${legend}`)
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <LegendsList legends={leyendas} onNewLegend={() => navigate("/nueva-leyenda")} onDeleteLegend={handleDeleteLegend} onEditLegend={handleEditLegend}/>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LegendsPage />} />
        <Route path="/nueva-leyenda" element={<NewLegend />} />
        <Route path="/editar-leyenda/:id" element={<EditLegend />} />
      </Routes>
    </Router>
  );
}

export default App;
