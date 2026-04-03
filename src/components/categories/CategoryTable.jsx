import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faEdit } from '@fortawesome/free-solid-svg-icons'
import { confirmDelete, successAlert } from '../../helper/alerts';
import DataTableImport from "react-data-table-component";

const CategoryTable = ({ 
  categories, onDelete, onEdit, 
  currentPage, lastPage, total, 
  fetchCategories, perPage, setPerPage, 
  searchQuery, setSearchQuery }) => {

  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      await onDelete(id);
      successAlert("Categoría eliminada");
    }
  };
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchCategories(1, perPage, query); // Reset to the first page when searching
  };
  const columns = [
    {
      name: "#", 
      cell: (row, index) => (<div>{(currentPage - 1) * perPage + index + 1}</div>), // Calcula el índice dinámicamente
      grow: 0,
      width: "48px", // Ajusta el ancho de la columna
      center: true, 
    },
    {
      name: "ID",
      selector: row => row.id,
      sortable: true,
      cell: row => <div>{row.id}</div>,
      grow: 1,
      width: '60px',
      center: true, 
    },
    {
      name: "Nombre",
      selector: row => row.name,
      grow: 2,
    },
    {
      name: "Fecha de creación",
      selector: row => row.created_at,
      grow: 1,
      cell: row => <div style={{ textAlign: 'center' }}>{formatDateTime(row.created_at)}</div>,
    },
    {
      name: "Acciones",
      cell: row => (
        <div className="d-flex justify-content-center">
          <button 
            className="btn btn-outline-primary btn-sm border-0"
            onClick={() => onEdit(row)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button 
            className="btn btn-outline-danger btn-sm border-0"
            onClick={() => handleDelete(row.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ),
      grow: 0,
      center: true,
      width: '90px',
    }
  ];
  const paginationOptions = {
    rowsPerPageText: 'Filas por página:',
    rangeSeparatorText: 'de',
    noRowsPerPage: false, // Si no quieres mostrar el selector de filas por página, cámbialo a true
    selectAllRowsItem: false, // Si no quieres mostrar la opción de seleccionar todas las filas, cámbialo a false
  };
  const customStyles = {
    rows: {
      style: {
        minHeight: '30px', // Altura mínima de las filas
        '&:hover': {
          backgroundColor: '#f1f1f1', // Color de fondo al pasar el mouse
        },
      },
    },
    headCells: {
      style: {
        backgroundColor: '#f5f5f7', // Color de fondo del encabezado
        fontWeight: 'bold',
      },
    },
    cells: {
      style: {},
    },
  };
  return (
    <>  
    <div className="mx-3 mb-3  d-flex align-items-center gap-2">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar categorías..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
    <DataTableImport.default
      columns={columns}
      data={categories}
      customStyles={customStyles} 
      pagination
      paginationServer
      paginationTotalRows={total}
      onChangePage={(page) => {
        console.log('onChangePage->page', page, ' | perPage', perPage);
        fetchCategories(page, perPage, searchQuery);
      }}
      paginationDefaultPage={currentPage}
      paginationPerPage={perPage}
      paginationRowsPerPageOptions={[6, 12, 24, 48]}
      onChangeRowsPerPage={(newPerPage, page) => {
        setPerPage(newPerPage);
        fetchCategories(page, newPerPage, searchQuery);
      }}
      paginationComponentOptions={paginationOptions} // Personalización del texto del paginador
      noDataComponent={<div className="text-center p-4">No hay registros de categorías para mostrar</div>}
    />
    {/* <table className="table table-hover">
      <thead className="table-light text-center">
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
            <td className='text-center'>{category.id}</td>
            <td>{category.name}</td>
            <td className='text-center'>{formatDateTime(category.created_at)}</td>
            <td>
              <div className="d-flex justify-content-center gap-1">
                <button 
                  className="btn btn-outline-primary btn-sm border-0"
                  onClick={() => onEdit(category)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button 
                  className="btn btn-outline-danger btn-sm border-0"
                  onClick={() => handleDelete(category.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table> */}
    
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