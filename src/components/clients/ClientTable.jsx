import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { confirmDelete, successAlert } from '../../helper/alerts';
import Pagination from '../Pagination';

const ClientTable = ({ clients, onDelete, onEdit, currentPage, lastPage, total, fetchClients }) => {
  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      await onDelete(id);
      successAlert("Cliente eliminado");
    }
  };
  return (
    <>  
    
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
                  onClick={() => handleDelete(client.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => onEdit(client)}>
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
  )
}
export default ClientTable;