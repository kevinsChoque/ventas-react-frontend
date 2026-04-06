import { useState, useEffect } from 'react';
import api from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [perPage, setPerPage] = useState(6);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await api.get('/units');
      setUnits(response.data);
    } catch (err) {
      console.error('Error al cargar unidades:', err);
    }
  };

  const fetchProducts = async (page = 1, perPage = 6, search = '') => {
    try {
      setLoading(true);
      const response = await api.get(`/products?page=${page}&per_page=${perPage}&search=${search}`);
      console.log(response.data.data)
      setProducts(response.data.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
      setTotal(response.data.total);
    } catch (err) {
      console.error('Error al cargar productos:', err);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product) => {
    try {
      setLoading(true);
      await api.post('/products', product);
      await fetchProducts();
    }
    catch (error) { console.log('Error al agregar producto:', error); }
    finally { setLoading(false); }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/products/${id}`);
      await fetchProducts(currentPage, perPage, searchQuery);
    } catch (error) {
      console.log('Error al eliminar producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      console.log('Enviando actualización para producto ID:', id, 'con datos:', product);
      setLoading(true);
      const response = await api.put(`/products/${id}`, product);
      console.log('Respuesta al actualizar producto:', response.data);
      await fetchProducts(currentPage, perPage, searchQuery);
    }
    catch (error) { console.log('Error al actualizar producto:', error); }
    finally { setLoading(false); }
  };

  return {
    products,
    units,
    loading,
    currentPage,
    lastPage,
    total,
    perPage,
    setPerPage,
    fetchProducts,
    searchQuery,
    setSearchQuery,
    createProduct,
    deleteProduct,
    updateProduct,
  };
}