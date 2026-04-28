import React, { useState, useEffect } from 'react';
import { Modal, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import ProductsAutocomplete from './ProductsAutocomplete';

const SelectProductsModal = ({ isOpen, onClose, onAddProduct, onEditProduct, productEdit }) => {
  const [selectedProduct, setSelectedProduct] = useState({
    id: null,
    name: '',
    quantity: 1,
    unitPrice: 0,
    totalPrice: 0,
    unit: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    let totalPrice;
    if(name=='quantity') {
      totalPrice = value * selectedProduct.unitPrice;
    }
    else if(name=='unitPrice') {
      totalPrice = value * selectedProduct.quantity;
    }
    setSelectedProduct(prev => ({ ...prev, [name]: value, totalPrice: totalPrice || prev.totalPrice }));
  };

  useEffect(() => {
    if (productEdit) {
      console.log('Producto a editar:', productEdit);
      setSelectedProduct({
        id: productEdit.id,
        name: productEdit.name,
        quantity: productEdit.quantity,
        unitPrice: productEdit.unitPrice,
        totalPrice: productEdit.totalPrice,
        unit: productEdit.unit
      });
    }
    else {
      setSelectedProduct({
        id: null, 
        name: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        unit: ''
      });
    }
  }, [productEdit]);

  const handleSave = () => {
    if(productEdit) {
      onEditProduct({
        ...selectedProduct,
        total: selectedProduct.quantity * selectedProduct.unitPrice,
        subtotal: (selectedProduct.quantity * selectedProduct.unitPrice) / 1.18,
        unitValue: selectedProduct.unitPrice / 1.18
      });
      onClose();
      return;
    }
    if (selectedProduct.id) {
      const total = selectedProduct.quantity * selectedProduct.unitPrice;
      const subtotal = total / 1.18; // Puedes sumar IGV si lo necesitas
      const unitValue = selectedProduct.unitPrice / 1.18; // Ejemplo de cálculo
      onAddProduct({
        ...selectedProduct,
        subtotal,
        total,
        unitValue
      });
      setSelectedProduct({
        id: null,
        name: '',
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        unit: ''
      });
    } else {
      alert('Por favor, selecciona un producto');
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered className='modal-lg'>
      <Modal.Header closeButton>
          <Modal.Title >{productEdit ? 'Editar' : 'Agregar'} Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="row">
            <Form.Group className='col-lg-12 mb-3'>
              <Form.Label className='m-0'>Producto</Form.Label>
              <ProductsAutocomplete  style={{ fontWeight: 700, color: '#23235b', zIndex: 1000 }}
                isDisabled={!!productEdit}
                value={selectedProduct.id ? { value: selectedProduct.id, label: selectedProduct.name } : null}
                onChange={option => setSelectedProduct({ ...selectedProduct, 
                  id: option ? option.value : null, 
                  name: option ? option.label : '', 
                  unit: option ? option.unit : '',
                  unitPrice: option ? option.unitPrice : 0,
                  totalPrice: option ? option.unitPrice * selectedProduct.quantity : 0
                })}/>
            </Form.Group>
            <Form.Group className='col-lg-4 mb-3'>
              <Form.Label className='m-0'>Cantidad</Form.Label>
              <InputGroup>
                <Button className="btn btn-light border" style={{ zIndex: 0 }}
                  onClick={() => {
                    setSelectedProduct(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }));
                    handleChange({ target: { name: 'quantity', value: Math.max(1, selectedProduct.quantity - 1) } });
                    }}>-</Button>
                <FormControl
                  type="text"
                  min={1}
                  value={selectedProduct.quantity}
                  onChange={handleChange}
                  style={{ textAlign: 'center', fontWeight: 700, color: '#23235b', zIndex: 0 }}
                />
                <Button className="btn btn-light border" style={{ zIndex: 0 }}
                  onClick={() => {
                    setSelectedProduct(prev => ({ ...prev, quantity: prev.quantity + 1 }))
                    handleChange({ target: { name: 'quantity', value: selectedProduct.quantity + 1 } });
                    }}>+</Button>
              </InputGroup>
            </Form.Group>
            <Form.Group className='col-lg-4 mb-3'>
              <Form.Label className='m-0'>Precio Unitario</Form.Label>
              <InputGroup>
                <InputGroup.Text>S/</InputGroup.Text>
                <FormControl
                  name="unitPrice"
                  type="number"
                  min={0}
                  step={0.01}
                  value={selectedProduct.unitPrice}
                  onChange={handleChange}
                  style={{ fontWeight: 700, color: '#23235b' }}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className='col-lg-4 mb-3'>
              <Form.Label className='m-0'>Precio Total</Form.Label>
              <InputGroup>
                <InputGroup.Text>S/</InputGroup.Text>
                <Form.Control type="number" min="0" placeholder="Ingresa el precio total" 
                  name="totalPrice"
                  value={selectedProduct.totalPrice} 
                  style={{ fontWeight: 700, color: '#23235b' }}
                  disabled
                />
              </InputGroup>
            </Form.Group>
          </div>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
          Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
          {productEdit ? 'Guardar' : 'Agregar'}
          </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SelectProductsModal;