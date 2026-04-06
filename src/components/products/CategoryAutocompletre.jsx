import React from 'react';
import AsyncSelect from 'react-select/async';
import api from '../../services/api';

const CategoryAutocomplete = ({ value, onChange, placeholder = 'Buscar categoría...' }) => {
  const loadOptions = async (inputValue, callback) => {
    try {
      const response = await api.get(`/categories?search=${inputValue}&per_page=10`);
      const options = (response.data.data || []).map(category => ({
        label: category.name,
        value: category.id
      }));
    //   console.log(options)
      callback(options);
    } catch (error) {
      callback([]);
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isClearable
    />
  );
};

export default CategoryAutocomplete;
