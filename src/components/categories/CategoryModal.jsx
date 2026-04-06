import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { validateCategory } from '../../validators/categoryValidator';
import { successAlert, errorAlert } from '../../helper/alerts';

const CategoryModal = ({ isOpen, onClose, createCategory, updateCategory, selectedCategory }) => {
  const [form, setForm] = useState({name: ''});
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    if (selectedCategory) {
      setForm({name: selectedCategory.name || ''});
    }
    else 
    {setForm({name: ''});}
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateCategory(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      if(selectedCategory) {await updateCategory(selectedCategory.id, form);}
      else {await createCategory(form);}
      setForm({name: ''});
      setErrors({})
      onClose();
      successAlert(`Categoría ${selectedCategory ? 'actualizada' : 'creada'} exitosamente`);
    } catch (error) {
      console.log('Error al agregar categoría:', error);
      errorAlert(`Error al ${selectedCategory ? 'actualizar' : 'crear'} la categoría`);
    }
  }

  const handleChange = (e) => {setForm({ ...form, [e.target.name]: e.target.value });}
  return (
    <Modal show={isOpen} onHide={onClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='formCategory' onSubmit={handleSubmit}>
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
      <Modal.Footer>
        <div className='d-flex justify-content-end gap-2 p-2 bg-white'>
          <Button variant="light" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" form='formCategory' type='submit'>
            Guardar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
export default CategoryModal;
