import { useState, useEffect } from "react";
import api from '../services/api';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchClients();
  }, []);
  const fetchClients = async (page=1) => {
    try {
      setLoading(true)
      const response = await api.get(`/clients?page=${page}`)
      setClients(response.data.data)

      setCurrentPage(response.data.current_page)
      setLastPage(response.data.last_page)
      setTotal(response.data.total)
    }
    catch (error) {console.log('Error al cargar clientes:', error);}
    finally {setLoading(false)}
  }
  const createClient = async (client) => {
    try {
      setLoading(true);
      await api.post('/clients', client); // Usando la instancia de axios configurada
      await fetchClients(); // Refresca la lista después de crear un cliente
    }
    catch (error) {console.log('Error al agregar cliente:', error);}  
    finally {setLoading(false);} 
  };
  const deleteClient = async (id) => {
    try {
      setLoading(true)
      await api.delete(`/clients/${id}`)
      await fetchClients()
    } 
    catch (error) {console.log('Error al eliminar cliente:', error);}
    finally {setLoading(false)}
  }
  const updateClient = async (id, client) => {
    try{
      setLoading(true);
      await api.put(`/clients/${id}`, client);
      await fetchClients(); // Refresca la lista después de actualizar un cliente
    }
    catch (error) {console.log('Error al actualizar cliente:', error);}
    finally {setLoading(false);}
  }
  return { 
    clients, 
    createClient, 
    deleteClient, 
    updateClient, 
    loading,
    currentPage,
    lastPage,
    total,
    fetchClients
  };
};