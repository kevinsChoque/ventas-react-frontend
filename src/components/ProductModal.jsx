import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const ProductModal = ({ show, handleClose, createProduct, updateProduct, selectedProduct, units }) => {
  const [form, setForm] = useState({ 
    unit_id:'',
    name: '', 
    price: '', 
    stock:'', 
    brand:'', 
    category:'' });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (selectedProduct) {
      setForm({
        unit_id: selectedProduct.unit_id || '',
        name: selectedProduct.name || '',
        price: selectedProduct.price || '',
        stock: selectedProduct.stock || '',
        brand: selectedProduct.brand || '',
        category: selectedProduct.category || ''
      });
    } else {
      setForm({ unit_id:'', name: '', price: '', stock:'', brand:'', category:'' });
    }
  }, [selectedProduct]);
  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }
    if (!form.price) {
      newErrors.price = "El precio es obligatorio";
    } else if (isNaN(form.price)) {
      newErrors.price = "El precio debe ser número";
    }
    if (!form.stock) {
      newErrors.stock = "El stock es obligatorio";
    } else if (!Number.isInteger(Number(form.stock))) {
      newErrors.stock = "El stock debe ser entero";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; 
    try {
      if(selectedProduct) {await updateProduct(selectedProduct.id,form)}
      else {await createProduct(form)}
      setForm({ unit_id:'', name: '', price: '', stock:'', brand:'', category:'' });
      handleClose()
    } catch (error) {
      console.log('Error al agregar producto:', error);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return(
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className='row'>
            <Form.Group className="col-lg-6 mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name='name'
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </Form.Group>
            <Form.Group className="col-lg-6 mb-3">
              <Form.Label>precio</Form.Label>
              <Form.Control
                type="text"
                name='price'
                value={form.price}
                onChange={handleChange}
              />
              {errors.price && <small className="text-danger">{errors.price}</small>}
            </Form.Group>
            <Form.Group className="col-lg-4 mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="text"
                name='stock'
                value={form.stock}
                onChange={handleChange}
              />
              {errors.stock && <small className="text-danger">{errors.stock}</small>}
            </Form.Group>
            <Form.Group className="col-lg-4 mb-3">
              <Form.Label>Unidad</Form.Label>
              <Form.Select
                name='unit_id'
                value={form.unit_id}
                onChange={handleChange}
              >
                <option value="">Selecciona una unidad</option>
                {units.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-lg-4 mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name='brand'
                value={form.brand || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="col-lg-4 mb-3">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                name='category'
                value={form.category || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ProductModal;
