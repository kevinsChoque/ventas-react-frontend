import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faEdit } from '@fortawesome/free-solid-svg-icons'
import { confirmDelete, successAlert } from '../../helper/alerts';

import DataTableImport from "react-data-table-component";
import CustomPagination from '../CustomPagination';
import '../CustomPagination.css';

const BrandTable = ({ brands, onDelete, onEdit, currentPage, lastPage, total, fetchBrands, perPage, setPerPage }) => {
  // console.log('brands')

  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      await onDelete(id);
      successAlert("Marca eliminada");
    }
  };
  const columns = [
  {
    name: "#", // Nombre de la columna
    cell: (row, index) => (
      <div className="text-center">
        {(currentPage - 1) * perPage + index + 1}
      </div>
    ), // Calcula el índice dinámicamente
    grow: 0,
    center: true,
    width: "48px", // Ajusta el ancho de la columna
  },
  {
    name: "ID",
    selector: row => row.id,
    sortable: true,
    cell: row => <div className='text-center'>{row.id}</div>,
    center: true,
    grow: 0,
    width: '60px',
    maxWidth: '80px'
  },
  {
    name: "Nombre",
    selector: row => row.name,
    grow: 1,
  },
  {
    name: "Fecha de creación",
    selector: row => row.created_at,
    grow: 1,
    cell: row => <div className='text-center'>{formatDateTime(row.created_at)}</div>,
    center: true,
  },
  {
    name: "Acciones",
    cell: row => (
      <div className="d-flex justify-content-center gap-1">
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
    center: true,
    width: '90px',
    maxWidth: '150px'
  }
];
  const paginationOptions = {
    rowsPerPageText: 'Filas por página:',
    rangeSeparatorText: 'de',
    noRowsPerPage: false, // Si no quieres mostrar el selector de filas por página, cámbialo a true
    selectAllRowsItem: false, // Si no quieres mostrar la opción de seleccionar todas las filas, cámbialo a false
  };
  return (
    <>  
    <DataTableImport.default
      columns={columns}
      data={brands}
      pagination={false} // Disable default pagination
      paginationServer

      paginationTotalRows={total}
      onChangePage={(page) => {
        console.log('onChangePage->page', page, ' | perPage', perPage)
        fetchBrands(page, perPage)
      }}

      paginationDefaultPage={currentPage}
      paginationPerPage={perPage}
      paginationRowsPerPageOptions={[6,12,24,48]}
      onChangeRowsPerPage={(newPerPage, page) => {
        setPerPage(newPerPage);
        fetchBrands(page, newPerPage)
      }}
      paginationComponentOptions={paginationOptions} // Personalización del texto del paginador
      noDataComponent={<div className="text-center p-4">No hay registros de marcas para mostrar</div>}
    />
    <CustomPagination
      currentPage={currentPage}
      totalPages={lastPage}
      rowsPerPage={perPage}
      totalRows={total}
      onPageChange={(page) => {
        fetchBrands(page, perPage);
      }}
      onRowsPerPageChange={(newPerPage) => {
        setPerPage(newPerPage);
        fetchBrands(1, newPerPage); // Reset to the first page when changing rows per page
      }}
    />
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