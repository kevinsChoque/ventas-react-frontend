import { useState, useEffect } from "react";
import api from '../services/api';

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchBrands();
  }, []);
  const fetchBrands = async (page=1) => {
    try {
      setLoading(true)
      const response = await api.get(`/brands?page=${page}`)
      setBrands(response.data.data)

      setCurrentPage(response.data.current_page)
      setLastPage(response.data.last_page)
      setTotal(response.data.total)
    }
    catch (error) {console.log('Error al cargar marcas:', error);}
    finally {setLoading(false)}
  }
  const createBrand = async (brand) => {
    try {
      setLoading(true);
      await api.post('/brands', brand); // Usando la instancia de axios configurada
      await fetchBrands(); // Refresca la lista después de crear una marca
    }
    catch (error) {console.log('Error al agregar marca:', error);}  
    finally {setLoading(false);} 
  };
  const deleteBrand = async (id) => {
    try {
      setLoading(true)
      await api.delete(`/brands/${id}`)
      await fetchBrands()
    } 
    catch (error) {console.log('Error al eliminar marca:', error);}
    finally {setLoading(false)}
  }
  const updateBrand = async (id, brand) => {
    try{
      setLoading(true);
      await api.put(`/brands/${id}`, brand);
      await fetchBrands(); // Refresca la lista después de actualizar una marca
    }
    catch (error) {console.log('Error al actualizar marca:', error);}
    finally {setLoading(false);}
  }
  return { 
    brands, 
    createBrand, 
    deleteBrand, 
    updateBrand, 
    loading,
    currentPage,
    lastPage,
    total,
    fetchBrands
  };
};