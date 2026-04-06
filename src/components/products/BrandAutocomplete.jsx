import React from 'react';
import AsyncSelect from 'react-select/async';
import api from '../../services/api';

const BrandAutocomplete = ({ value, onChange, placeholder = 'Buscar marca...' }) => {
  const loadOptions = async (inputValue, callback) => {
    try {
      const response = await api.get(`/brands?search=${inputValue}&per_page=10`);
      const options = (response.data.data || []).map(brand => ({
        label: brand.name,
        value: brand.id
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

export default BrandAutocomplete;
