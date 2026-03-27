import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { confirmDelete, successAlert } from '../../helper/alerts';

const CategoryTable = ({ categories, onDelete, onEdit, currentPage, lastPage, total, fetchCategories }) => {
  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      await onDelete(id);
      successAlert("Categoría eliminada");
    }
  };
  return (
    <>  
    
    <table className="table">
      <thead className="table-secondary text-center">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Fecha de creación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{formatDateTime(category.created_at)}</td>
            <td>
              <div className="d-flex justify-content-center gap-1">
                <button 
                  className="btn btn-outline-danger btn-sm me-2"
                  onClick={() => handleDelete(category.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button 
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => onEdit(category)}>
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
export default CategoryTable;