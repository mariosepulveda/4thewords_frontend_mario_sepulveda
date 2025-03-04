import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Cambia por la API real

export const getLeyendas = async () => {
    try {
        const response = await axios.get(API_URL+'/leyendas');
        return response.data;
    } catch (error) {
        console.error("Error al obtener las leyendas:", error);
        return [];
    }
};

// Función para crear una nueva leyenda
export const createLeyenda = async (leyendaData) => {
    try {
        const response = await axios.post(API_URL, leyendaData);
        return response.data;
    } catch (error) {
        console.error("Error al crear la leyenda:", error);
        throw error;
    }
};

// Función para obtener una leyenda por su ID
export const getLeyendaById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la leyenda:", error);
        throw error;
    }
};

// Función para actualizar una leyenda por su ID
export const updateLeyenda = async (id, leyendaData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, leyendaData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la leyenda:", error);
        throw error;
    }
};

// Función para eliminar una leyenda por su ID
export const deleteLeyenda = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la leyenda:", error);
        throw error;
    }
};