import { Modal, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import api from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

const Clients = () => {
  const [ newClient, setNewClient] = useState({
    document_type: '',
    document_number: '',
    name: '',
    phone: '',
    address: ''
  })
  const [showModal, setShowModal] = useState(false)
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  // para la paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
// fin
  const fetchClients = async (page=1) => {
    try {
      setLoading(true)
      const response = await api.get(`/clients?page=${page}`)
      setClients(response.data.data)

      setCurrentPage(response.data.current_page)
      setLastPage(response.data.last_page)
      setTotal(response.data.total)
    }
    catch (error) {console.log('Error al cargar clientes:', error);}
    finally {setLoading(false)}
  }
  useEffect( () => {
    fetchClients()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      if(selectedClient) {await api.put(`/clients/${selectedClient.id}`, newClient)}
      else {await api.post('/clients', newClient)}
      setNewClient({
        document_type: '',
        document_number: '',
        name: '',
        phone: '',
        address: ''
      })
      await fetchClients()
      setShowModal(false)
    } catch (error) {console.log('Error al agregar cliente:', error);
    }finally {setLoading(false)}
  }
  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este cliente?')) {
      try {
        setLoading(true)
        await api.delete(`/clients/${id}`)
        await fetchClients()
      } 
      catch (error) {console.log('Error al eliminar cliente:', error);}
      finally {setLoading(false)}
  }}
  const styles = {
      overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      },
      loader: {
        width: "60px",
        height: "60px",
        border: "6px solid #f3f3f3",
        borderTop: "6px solid #3498db",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      },
    }
  return (
    <>
    {loading ? (<div className='overlay-complete' style={styles.overlay}>
        <div style={styles.loader}></div>
      </div>) : null}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Clientes</h3>
        <button 
          className="btn btn-primary" 
          onClick={() => {setShowModal(true); setSelectedClient(null); setNewClient({
            document_type: '',
            document_number: '',
            name: '',
            phone: '',
            address: ''
          })}}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Nuevo Cliente
        </button>
      </div>
      <div className="table-respo">
        <table className="table">
          <thead className="table-secondary text-center">
            <tr>
              <th>ID</th>
              <th>Tipo de doc.</th>
              <th>Numero</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Direccion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.document_type}</td>
                <td>{client.document_number}</td>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>{client.address}</td>
                <td>
                  <div className="d-flex justify-content-center gap-1">
                    <button 
                      className="btn btn-outline-danger btn-sm me-2"
                      onClick={() => handleDelete(client.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => {
                        setSelectedClient(client)
                        setNewClient(client)
                        setShowModal(true)
                      }}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-secondary me-2"
            disabled={currentPage === 1}
            onClick={() => fetchClients(currentPage - 1)}
          >
            Anterior
          </button>
          <span className="align-self-center">
            Página {currentPage} de {lastPage}
          </span>
          <button
            className="btn btn-outline-secondary ms-2"
            disabled={currentPage === lastPage}
            onClick={() => fetchClients(currentPage + 1)}
          >
            Siguiente
          </button>
        </div> */}
        <div className="d-flex justify-content-between align-items-center mt-3">

  {/* Total */}
  <div>
    Total {total}
  </div>

  {/* Controles */}
  <div className="d-flex align-items-center gap-2">

    {/* Anterior */}
    <button
      className="btn btn-light"
      disabled={currentPage === 1}
      onClick={() => fetchClients(currentPage - 1)}
    >
      ‹
    </button>

    {/* Números */}
    {Array.from({ length: lastPage }, (_, i) => i + 1)
      .slice(Math.max(0, currentPage - 3), currentPage + 2)
      .map(page => (
        <button
          key={page}
          className={`btn ${
            currentPage === page ? "btn-primary" : "btn-light"
          }`}
          onClick={() => fetchClients(page)}
        >
          {page}
        </button>
      ))}

    {/* Siguiente */}
    <button
      className="btn btn-light"
      disabled={currentPage === lastPage}
      onClick={() => fetchClients(currentPage + 1)}
    >
      ›
    </button>

  </div>
</div>
      </div>
      {/* modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size='lg'>
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
                  value={newClient.document_type} 
                  onChange={(e) => setNewClient({...newClient, document_type: e.target.value})}>
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
                  value={newClient.document_number}
                  onChange={(e) => setNewClient({...newClient, document_number: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="col-lg-6 mb-3">
                <Form.Label className='m-0'>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name='name'
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="col-lg-3 mb-3">
                <Form.Label className='m-0'>Celular</Form.Label>
                <Form.Control
                  type="text"
                  name='phone'
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="col-lg-9 mb-3">
                <Form.Label className='m-0'>Direccion</Form.Label>
                <Form.Control
                  type="text"
                  name='address'
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <modal-footer>
          <div className='d-flex justify-content-end gap-2 p-2 bg-light'>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" form='formClient' type='submit'>
              Guardar
            </Button>
          </div>
        </modal-footer>
      </Modal>
    </>
  );
};
export default Clients;