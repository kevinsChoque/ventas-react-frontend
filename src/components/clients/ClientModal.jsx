import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
const ClientModal = ({ isOpen, onClose, createClient, updateClient, selectedClient }) => {
  const [form, setForm] = useState({
    document_type: '',
    document_number: '',
    name: '',
    phone: '',
    address: ''
  });
  useEffect(() => {
    if (selectedClient) {
      // Aquí podrías cargar los datos del cliente seleccionado en el formulario
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
    try {
      if(selectedClient) {await updateClient(selectedClient.id, form);}
      else {await createClient(form);}
      setForm({document_type: '',document_number: '',name: '',phone: '',address: ''});
      onClose();
    } catch (error) {console.log('Error al agregar cliente:', error);}
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
                >
                  <option value="" disabled>Seleccione . . .</option>
                  <option value="DNI">DNI</option>
                  <option value="RUC">RUC</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="col-lg-3 mb-3">
              <Form.Label className='m-0'>Numero</Form.Label>
              <Form.Control
                type="text"
                name='document_number'
                value={form.document_number}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="col-lg-6 mb-3">
              <Form.Label className='m-0'>Nombre</Form.Label>
              <Form.Control
                type="text"
                name='name'
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="col-lg-3 mb-3">
              <Form.Label className='m-0'>Celular</Form.Label>
              <Form.Control
                type="text"
                name='phone'
                value={form.phone}
                onChange={handleChange}
              />
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
      <modal-footer>
        <div className='d-flex justify-content-end gap-2 p-2 bg-light'>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" form='formClient' type='submit'>
            Guardar
          </Button>
        </div>
      </modal-footer>
    </Modal>
  )
}
export default ClientModal;
