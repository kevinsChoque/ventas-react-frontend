import { useState, useEffect } from "react";
import api from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async (page=1) => {
    try {
      setLoading(true)
      const response = await api.get(`/categories?page=${page}`)
      setCategories(response.data.data)

      setCurrentPage(response.data.current_page)
      setLastPage(response.data.last_page)
      setTotal(response.data.total)
    }
    catch (error) {console.log('Error al cargar categorías:', error);}
    finally {setLoading(false)}
  }
  const createCategory = async (category) => {
    try {
      setLoading(true);
      await api.post('/categories', category); // Usando la instancia de axios configurada
      await fetchCategories(); // Refresca la lista después de crear una categoría
    }
    catch (error) {console.log('Error al agregar categoría:', error);}  
    finally {setLoading(false);} 
  };
  const deleteCategory = async (id) => {
    try {
      setLoading(true)
      await api.delete(`/categories/${id}`)
      await fetchCategories()
    } 
    catch (error) {console.log('Error al eliminar categoría:', error);}
    finally {setLoading(false)}
  }
  const updateCategory = async (id, category) => {
    try{
      setLoading(true);
      await api.put(`/categories/${id}`, category);
      await fetchCategories(); // Refresca la lista después de actualizar una categoría
    }
    catch (error) {console.log('Error al actualizar categoría:', error);}
    finally {setLoading(false);}
  }
  return { 
    categories, 
    createCategory, 
    deleteCategory, 
    updateCategory, 
    loading,
    currentPage,
    lastPage,
    total,
    fetchCategories
  };
};