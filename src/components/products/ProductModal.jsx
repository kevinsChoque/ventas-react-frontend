import { Modal, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { validateProduct } from '../../validators/productValidator';
import BrandAutocomplete from './BrandAutocomplete';
import CategoryAutocomplete from './CategoryAutocomplete';
import AsyncSelect from 'react-select/async';
import { useBrands } from '../../hooks/useBrands';
import { useCategories } from '../../hooks/useCategories';
import { errorAlert } from '../../helper/alerts';
import { useNotify } from '../../helper/useNotify';
import { useRef } from 'react';

const ProductModal = ({ show, onClose, createProduct, updateProduct, selectedProduct, units }) => {
  const { createBrandWithResponse } = useBrands();
  const { createCategoryWithResponse } = useCategories();
  const [creatingBrand, setCreatingBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [creatingCategory, setCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const notify = useNotify();
  const [form, setForm] = useState({ 
    unit_id:'', // solo el id
    unit_name: '', // para mostrar el nombre en el select
    name: '', 
    price: '', 
    stock:'', 
    brand_id: '', // solo el id
    brand_name: '', // para mostrar el nombre en el autocomplete
    category_id: '', // solo el id
    category_name: '', // para mostrar el nombre en el autocomplete
    image: null
  });
  
  const [preview, setPreview] = useState(null);
  const [originalImage, setOriginalImage] = useState(null); // Para guardar la imagen original
  const fileInputRef = useRef();
  // Actualiza la previsualización cuando se selecciona una imagen
  useEffect(() => {
    if (form.image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(form.image);
    } else {
      setPreview(null);
    }
  }, [form.image]);

  // Cuando cambia el producto seleccionado, setea la imagen original
  useEffect(() => {
    if (selectedProduct && selectedProduct.image) {
      setOriginalImage(selectedProduct.image);
    } else {
      setOriginalImage(null);
    }
  }, [selectedProduct]);
  
  const [errors, setErrors] = useState({});
  // console.log('Selected product changed:', selectedProduct);
  useEffect(() => {
    if (selectedProduct) {
      setForm({
        unit_id: selectedProduct.unit_id || '',
        unit_name: selectedProduct.unit?.name || '',
        name: selectedProduct.name || '',
        price: selectedProduct.price || '',
        stock: selectedProduct.stock || '',
        brand_id: selectedProduct.brand_id || '',
        brand_name: selectedProduct.brand?.name || '',
        category_id: selectedProduct.category_id || '',
        category_name: selectedProduct.category?.name || '',
        image: null // no cargamos la imagen al editar, solo previsualizamos si el usuario selecciona una nueva
      });
      setPreview(null); // Limpiar preview al abrir modal de edición
    } else {
      setForm({ 
        unit_id:'', unit_name: '', name: '', 
        price: '', stock:'', brand_id: '', 
        brand_name: '', category_id: '', category_name: '', 
        image: null });
      setPreview(null);
    }
  }, [selectedProduct]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateProduct(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      let dataToSend;
      if (form.image) {
        dataToSend = new FormData();
        dataToSend.append('name', form.name);
        dataToSend.append('price', form.price);
        dataToSend.append('stock', form.stock);
        dataToSend.append('unit_id', form.unit_id);
        dataToSend.append('brand_id', form.brand_id);
        dataToSend.append('category_id', form.category_id);
        dataToSend.append('image', form.image);
      } else {
        dataToSend = {
          name: form.name,
          price: form.price,
          stock: form.stock,
          unit_id: form.unit_id,
          brand_id: form.brand_id,
          category_id: form.category_id,
        };
      }
      if(selectedProduct) {
        await updateProduct(selectedProduct.id, dataToSend);
      } else {
        await createProduct(dataToSend);
      }
      setForm({ 
        unit_id:'', unit_name: '', name: '', 
        price: '', stock:'', brand_id: '', 
        brand_name: '', category_id: '', category_name: '', 
        image: null });
      onClose();
      notify(`Producto ${selectedProduct ? 'actualizado' : 'creado'} exitosamente`, { variant: 'success' });
    } catch (error) {
      console.log('Error al agregar producto:', error);
      errorAlert(`Error al ${selectedProduct ? 'actualizar' : 'crear'} el producto`);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const handleSaveCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await createCategoryWithResponse({ name: newCategoryName });
      if(!res || !res.id) {
        errorAlert('Categoría creada pero no se recibió el ID. Es posible que debas refrescar la página para verla en la lista.');
      }
      else {setForm(f => ({ ...f, category_id: res.id, category_name: res.name }));}
      setCreatingCategory(false);
      setNewCategoryName('');
    } catch (err) {
      errorAlert('Error al crear la categoría');
    }
  };
  const handleSaveBrand = async () => {
    if (!newBrandName.trim()) return;
    try {
      const res = await createBrandWithResponse({ name: newBrandName });
      if(!res || !res.id) {
        errorAlert('Marca creada pero no se recibió el ID. Es posible que debas refrescar la página para verla en la lista.');
      }
      else {setForm(f => ({ ...f, brand_id: res.id, brand_name: res.name }));}
      setCreatingBrand(false);
      setNewBrandName('');
    } catch (err) {
      errorAlert('Error al crear la marca');
    }
  };

  return(
    <Modal show={show} onHide={onClose} size='lg' centered>
      <Modal.Header closeButton className='p-2'>
        <Modal.Title>{selectedProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='formProduct' onSubmit={handleSubmit}>
          <Tabs defaultActiveKey="general" className="mb-3">
            <Tab eventKey="general" title="General">
              <div className="row">
                <Form.Group className="col-lg-6 mb-3">
                  <Form.Label className='m-0'>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-lg-6 mb-3">
                  <Form.Label className='m-0'>Precio</Form.Label>
                  <Form.Control
                    type="text"
                    name='price'
                    value={form.price}
                    onChange={handleChange}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-lg-6 mb-3">
                  <Form.Label className='m-0'>Stock</Form.Label>
                  <Form.Control
                    type="text"
                    name='stock'
                    value={form.stock}
                    onChange={handleChange}
                    isInvalid={!!errors.stock}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.stock}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-lg-6 mb-3">
                  <Form.Label className='m-0'>Unidad</Form.Label>
                  <AsyncSelect
                    cacheOptions
                    isClearable
                    placeholder="Buscar o escribir unidad..."
                    defaultOptions={units.map(unit => ({ label: unit.name, value: unit.id }))}
                    value={form.unit_id ? { label: form.unit_name, value: form.unit_id } : null}
                    onChange={option => {
                      setForm(f => ({ ...f, unit_id: option ? option.value : '', unit_name: option ? option.label : '' }));
                    }}
                    loadOptions={(inputValue, callback) => {
                      const filtered = units
                        .filter(u => u.name.toLowerCase().includes(inputValue.toLowerCase()))
                        .map(u => ({ label: u.name, value: u.id }));
                      callback(filtered);
                    }}
                  />
                </Form.Group>
              </div>
            </Tab>
            <Tab eventKey="atributos" title="Atributos">
              <div className="row">
                <div className='col-lg-4 mb-3'>
                  <Form.Group>
                    <Form.Label className='m-0'>Imágen</Form.Label>
                    <div
                      style={{
                        border: '1px dashed #bfc3c9',
                        borderRadius: 8,
                        minHeight: 220,
                        minWidth: 160,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        background: '#fafbfc',
                        marginBottom: 8
                      }}
                      onClick={() => fileInputRef.current.click()}
                    >
                      {preview ? (
                        <img src={preview} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 6 }} />
                      ) : originalImage ? (
                        <img src={originalImage} alt="actual" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 6, opacity: 0.7 }} />
                      ) : (
                        <span style={{ color: '#bfc3c9', fontSize: 48, lineHeight: 1 }}>
                          +
                        </span>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="image"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => {
                          setForm(f => ({ ...f, image: e.target.files[0] }));
                        }}
                      />
                    </div>
                    <div style={{ fontSize: 14, color: '#7a7a7a', textAlign: 'center' }}>
                      Se recomienda resoluciones<br />entre 700px a 900px, no mayores de 1MB
                    </div>
                  </Form.Group>
                </div>
                <div className='col-lg-8'>
                  <div className="row">
                    <Form.Group className='col-lg-12 mb-3'>
                      <div className="d-flex justify-content-between align-items-center m-0">
                        <Form.Label className="m-0">Marca</Form.Label>
                        {creatingBrand ? (
                          <span>
                            <span 
                              className="text-primary fw-bold" 
                              role="button" 
                              onClick={handleSaveBrand}
                            >[ + Guardar ]</span>
                            <span 
                              className="text-danger fw-bold ms-2" 
                              role="button"
                              onClick={() => {
                                setCreatingBrand(false);
                                setNewBrandName('');
                              }}
                            >[ Cancelar ]</span>
                          </span>
                        ) : (
                          <span>
                            <span 
                              className="text-primary fw-bold" 
                              role="button" 
                              onClick={() => setCreatingBrand(true)}
                            >[ + Nuevo ]</span>
                          </span>
                        )}
                      </div>
                      {creatingBrand ? (
                        <Form.Control
                          type='text'
                          value={newBrandName}
                          onChange={e => setNewBrandName(e.target.value)}
                          placeholder='Nombre de la nueva marca'
                          autoFocus
                          className='mt-1'
                        />
                      ) : (
                        <BrandAutocomplete
                          value={form.brand_id ? { label: form.brand_name, value: form.brand_id } : null}
                          onChange={option => {
                            setForm(f => ({ ...f, brand_id: option ? option.value : null, brand_name: option ? option.label : '' }));
                          }}
                          placeholder="Seleccionar"
                        />
                      )}
                    </Form.Group>
                    <Form.Group className='col-lg-12 mb-3'>
                      <div className="d-flex justify-content-between align-items-center m-0">
                        <Form.Label className="m-0">Categoria</Form.Label>
                        {creatingCategory ? (
                          <span>
                            <span 
                              className="text-primary fw-bold" 
                              role="button" 
                              onClick={handleSaveCategory}
                            >[ + Guardar ]</span>
                            <span 
                              className="text-danger fw-bold ms-2" 
                              role="button"
                              onClick={() => {
                                setCreatingCategory(false);
                                setNewCategoryName('');
                              }}
                            >[ Cancelar ]</span>
                          </span>
                        ) : (
                          <span>
                            <span 
                              className="text-primary fw-bold" 
                              role="button" 
                              onClick={() => setCreatingCategory(true)}
                            >[ + Nuevo ]</span>
                          </span>
                        )}
                      </div>
                      {creatingCategory ? (
                        <Form.Control
                          type='text'
                          value={newCategoryName}
                          onChange={e => setNewCategoryName(e.target.value)}
                          placeholder='Nombre de la nueva categoría'
                          autoFocus
                          className='mt-1'
                        />
                      ) : (
                        <CategoryAutocomplete
                          value={form.category_id ? { label: form.category_name, value: form.category_id } : null}
                          onChange={option => {
                            setForm(f => ({ ...f, category_id: option ? option.value : null, category_name: option ? option.label : '' }));
                          }}
                          placeholder="Seleccionar"
                        />
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Form>
      </Modal.Body>
      <Modal.Footer className='p-1'>
        <div className='d-flex justify-content-end gap-2 bg-white'>
          <Button variant="light" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" form='formProduct' type='submit'>
            Guardar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default ProductModal;
