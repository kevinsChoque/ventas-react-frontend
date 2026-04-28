import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import api from "../../../services/api";

const ProductsAutocomplete = ({ 
  value, onChange, placeholder = "Buscar producto...", isDisabled }) => {
  const [defaultProducts, setDefaultProducts] = useState([]);

  useEffect(() => {
    // Cargar productos por defecto al montar el componente
    const fetchDefaultProducts = async () => {
      try {
        const response = await api.get('/products?per_page=10');
        const options = (response.data.data || []).map(product => ({
          label: product.name,
          value: product.id,
          unit: product.unit.name,
          unitPrice: product.price
        }));
        setDefaultProducts(options);
      } catch (error) {
        setDefaultProducts([]);
      }
    };
    fetchDefaultProducts();
  }, []);

  const loadOptions = async (inputValue, callback) => {
    try { 
      const response = await api.get(`/products?search=${inputValue}&per_page=10`);
      const options = (response.data.data || []).map(product => ({
        label: product.name,
        value: product.id,
        unit: product.unit.name,
        unitPrice: product.price
      }));
      callback(options);
    } catch (error) {
      callback([]);
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={defaultProducts}
      loadOptions={loadOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isClearable
      isDisabled={isDisabled}
    />
  );
};

export default ProductsAutocomplete;