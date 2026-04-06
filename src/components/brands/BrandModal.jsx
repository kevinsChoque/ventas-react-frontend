import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { validateBrand } from '../../validators/brandValidator';
import { successAlert, errorAlert } from '../../helper/alerts';

const BrandModal = ({ isOpen, onClose, createBrand, updateBrand, selectedBrand }) => {
  const [form, setForm] = useState({name: ''});
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    if (selectedBrand) {setForm({name: selectedBrand.name || ''});}
    else {setForm({name: ''});}
  }, [selectedBrand]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateBrand(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      if(selectedBrand) {await updateBrand(selectedBrand.id, form);}
      else {await createBrand(form);}
      setForm({name: ''});
      setErrors({})
      onClose();
      successAlert(`Marca ${selectedBrand ? 'actualizada' : 'creada'} exitosamente`);
    } catch (error) {
      console.log('Error al agregar marca:', error);
      errorAlert(`Error al ${selectedBrand ? 'actualizar' : 'crear'} la marca`);
    }
  }

  const handleChange = (e) => {setForm({ ...form, [e.target.name]: e.target.value });}
  return (
    <Modal show={isOpen} onHide={onClose} size='lg' centered>
      <Modal.Header closeButton className='p-2 modal-dialog-centered'>
        <Modal.Title>Agregar Nueva Marca</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='formBrand' onSubmit={handleSubmit}>
          <div className='row'>
            <Form.Group className="col-lg-12 mb-3">
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
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className='p-1'>
        <div className='d-flex justify-content-end gap-2 bg-white'>
          <Button variant="light" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" form='formBrand' type='submit'>
            Guardar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
export default BrandModal;
