import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faEdit } from '@fortawesome/free-solid-svg-icons'
import { confirmDelete, successAlert } from '../../helper/alerts';

const BrandTable = ({ brands, onDelete, onEdit, currentPage, lastPage, total, fetchBrands }) => {
  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      await onDelete(id);
      successAlert("Marca eliminada");
    }
  };
  return (
    <>  
    <table className="table table-hover">
      <thead className="table-light text-center">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Fecha de creación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {brands.map(brand => (
          <tr key={brand.id}>
            <td className='text-center'>{brand.id}</td>
            <td>{brand.name}</td>
            <td className='text-center'>{formatDateTime(brand.created_at)}</td>
            <td>
              <div className="d-flex justify-content-center gap-1">
                <button 
                  className="btn btn-outline-primary btn-sm border-0"
                  onClick={() => onEdit(brand)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button 
                  className="btn btn-outline-danger btn-sm border-0"
                  onClick={() => handleDelete(brand.id)}>
                  <FontAwesomeIcon icon={faTrash} />
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
const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }) + ' ' + date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};
export default BrandTable;