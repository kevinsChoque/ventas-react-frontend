import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faEdit } from '@fortawesome/free-solid-svg-icons'
import { confirmDelete, successAlert } from '../../helper/alerts';
import DataTableImport from 'react-data-table-component';

const ClientTable = ({ 
  clients, onDelete, onEdit, 
  currentPage, lastPage, total, 
  fetchClients, perPage, setPerPage, 
  searchQuery, setSearchQuery }) => {
  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      await onDelete(id);
      successAlert("Cliente eliminado");
    }
  };
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchClients(1, perPage, query); // Reset to the first page when searching
  };
  const columns = [
    {
      name: "#", 
      cell: (row, index) => (<div>{(currentPage - 1) * perPage + index + 1}</div>), // Calcula el índice dinámicamente
      grow: 0,
      width: "48px", // Ajusta el ancho de la columna
      center: true, 
    },
    // {
    //   name: "ID",
    //   selector: row => row.id,
    //   sortable: true,
    //   cell: row => <div>{row.id}</div>,
    //   grow: 1,
    //   width: '60px',
    //   center: true, 
    // },
    {
      name: "Tipo Doc.",
      selector: row => row.document_type,
      grow: 1,
      width: "72px",
      center: true,
    },
    {
      name: "Nro. Documento",
      selector: row => row.document_number,
      grow: 1,
      width: "120px",
      center: true,
    },
    {
      name: "Nombre",
      selector: row => row.name,
      grow: 2,
    },
    {
      name: "Teléfono",
      selector: row => row.phone,
      grow: 1,
      center: true,
    },
    {
      name: "Dirección",
      selector: row => row.address,
      grow: 2,
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
        placeholder="Buscar clientes..."
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
    <DataTableImport.default
      columns={columns}
      data={clients}
      customStyles={customStyles} 
      pagination
      paginationServer
      paginationTotalRows={total}
      onChangePage={(page) => {
        console.log('onChangePage->page', page, ' | perPage', perPage);
        fetchClients(page, perPage, searchQuery);
      }}
      paginationDefaultPage={currentPage}
      paginationPerPage={perPage}
      paginationRowsPerPageOptions={[6, 12, 24, 48]}
      onChangeRowsPerPage={(newPerPage, page) => {
        setPerPage(newPerPage);
        fetchClients(page, newPerPage, searchQuery);
      }}
      paginationComponentOptions={paginationOptions} // Personalización del texto del paginador
      noDataComponent={<div className="text-center p-4">No hay registros de clientes para mostrar</div>}
    />
  </>
  )
}
export default ClientTable;