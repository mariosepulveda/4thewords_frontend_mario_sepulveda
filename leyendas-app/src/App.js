import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { getLeyendas, deleteLeyenda  } from "./services/api";
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
    await deleteLeyenda(id);
    setLeyendas(leyendas.filter(legend => legend.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <LegendsList legends={leyendas} onNewLegend={() => navigate("/nueva-leyenda")} onDeleteLegend={handleDeleteLegend}/>
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

/**
 * import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListaLeyendas from "./pages/ListaLeyendas";
import CrearLeyenda from "./pages/CrearLeyenda";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaLeyendas />} />
        <Route path="/crear" element={<CrearLeyenda />} />
      </Routes>
    </Router>
  );
}

export default App;

 */