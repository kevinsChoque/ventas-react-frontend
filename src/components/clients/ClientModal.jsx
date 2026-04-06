import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { validateClient } from '../../validators/clientValidator';
import { successAlert, errorAlert } from '../../helper/alerts';

const ClientModal = ({ isOpen, onClose, createClient, updateClient, selectedClient }) => {
  const [form, setForm] = useState({
    document_type: '',
    document_number: '',
    name: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    if (selectedClient) {
      setForm({
        document_type: selectedClient.document_type || '',
        document_number: selectedClient.document_number || '',
        name: selectedClient.name || '',  
        phone: selectedClient.phone || '',
        address: selectedClient.address || ''
      });
    }
    else 
    {setForm({document_type: '',document_number: '',name: '',phone: '',address: ''});}
  }, [selectedClient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateClient(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      if(selectedClient) {await updateClient(selectedClient.id, form);}
      else {await createClient(form);}
      setForm({document_type: '',document_number: '',name: '',phone: '',address: ''});
      setErrors({})
      onClose();
      successAlert(`Cliente ${selectedClient ? 'actualizado' : 'creado'} exitosamente`);
    } catch (error) {
      console.log('Error al agregar cliente:', error);
      errorAlert(`Error al ${selectedClient ? 'actualizar' : 'crear'} el cliente`);
    }
  }

  const handleChange = (e) => {setForm({ ...form, [e.target.name]: e.target.value });}
  return (
    <Modal show={isOpen} onHide={onClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='formClient' onSubmit={handleSubmit}>
          <div className='row'>
            <Form.Group className="col-lg-3 mb-3">
              <Form.Label className='m-0'>Tipo de documento</Form.Label>
              <Form.Select 
                name='document_type' 
                value={form.document_type} 
                onChange={handleChange}
                isInvalid={!!errors.document_type}
                >
                  <option value="" disabled>Seleccione . . .</option>
                  <option value="DNI">DNI</option>
                  <option value="RUC">RUC</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.document_type}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col-lg-3 mb-3">
              <Form.Label className='m-0'>Numero</Form.Label>
              <Form.Control
                type="text"
                name='document_number'
                value={form.document_number}
                onChange={handleChange}
                isInvalid={!!errors.document_number}
              />
              <Form.Control.Feedback type='invalid'> 
                {errors.document_number}
              </Form.Control.Feedback>
            </Form.Group>
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
            <Form.Group className="col-lg-3 mb-3">
              <Form.Label className='m-0'>Celular</Form.Label>
              <Form.Control
                type="text"
                name='phone'
                value={form.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="col-lg-9 mb-3">
              <Form.Label className='m-0'>Direccion</Form.Label>
              <Form.Control
                type="text"
                name='address'
                value={form.address}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className='d-flex justify-content-end gap-2 p-2 bg-white'>
          <Button variant="light" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" form='formClient' type='submit'>
            Guardar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
export default ClientModal;
