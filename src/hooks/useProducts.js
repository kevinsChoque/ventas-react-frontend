import { useState, useEffect } from 'react';
import api from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false); 
  const [error, setError] = useState(null);
  const [units, setUnits] = useState([]);
  useEffect(() => {
    fetchProducts();
    fetchUnits();
  }, []);
  const fetchUnits = async () => {
    try {
      const response = await api.get('/units'); // Usando la instancia de axios configurada
      setUnits(response.data);
    } catch (err) {
      console.error('Error al cargar unidades:', err);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products'); // cUsando la instancia de axios configurada
      setProducts(response.data);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };   
  const createProduct = async (product) => {
    try {
      setLoadingAction(true);
      await api.post('/products', product); // Usando la instancia de axios configurada
      await fetchProducts(); // Refresca la lista después de crear un producto
    }
    catch (error) {console.log('Error al agregar producto:', error);}  
    finally {setLoadingAction(false);} 
  };
  const deleteProduct = async (id) => {
    try {
      setLoadingAction(true);
      await api.delete(`/products/${id}`); // Usando la instancia de axios configurada
      await fetchProducts(); // Refresca la lista después de eliminar un producto
    } catch (error) {
      console.log('Error al eliminar producto:', error);
    }
    finally {
      setLoadingAction(false);
    }
  }
  const updateProduct = async (id, product) => {
    try{
      setLoadingAction(true);
      await api.put(`/products/${id}`, product); // Usando la instancia de axios configurada
      await fetchProducts(); // Refresca la lista después de actualizar un producto
    }
    catch (error) {console.log('Error al actualizar producto:', error);}
    finally {setLoadingAction(false);}
  }
  return { products, units, loading, loadingAction, error, createProduct, deleteProduct, updateProduct };
}