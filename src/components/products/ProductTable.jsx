import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { confirmDelete, successAlert } from '../../helper/alerts';
import DataTableImport from 'react-data-table-component';

const ProductTable = ({
  products, onDelete, onEdit,
  currentPage, total,
  fetchProducts, perPage, setPerPage,
  searchQuery, setSearchQuery }) => {

  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      await onDelete(id);
      successAlert("Producto eliminado");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchProducts(1, perPage, query);
  };

  const columns = [
    {
      name: "#",
      cell: (row, index) => <div>{(currentPage - 1) * perPage + index + 1}</div>,
      grow: 0,
      width: "48px",
      center: true,
    },
    {
      name: "Unidad",
      selector: row => row.unit?.name,
      cell: row => <div>{row.unit?.name || 'N/A'}</div>,
      grow: 1,
      center: true,
    },
    {
      name: "Nombre",
      selector: row => row.name,
      grow: 2,
    },
    {
      name: "Precio",
      selector: row => row.price,
      cell: row => <div>${row.price}</div>,
      grow: 1,
      center: true,
    },
    {
      name: "Stock",
      selector: row => row.stock,
      cell: row => <div>{row.stock}</div>,
      grow: 1,
      center: true,
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
    noRowsPerPage: false,
    selectAllRowsItem: false,
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: '30px',
        '&:hover': { backgroundColor: '#f1f1f1' },
      },
    },
    headCells: {
      style: {
        backgroundColor: '#f5f5f7',
        fontWeight: 'bold',
      },
    },
    cells: { style: {} },
  };

  return (
    <>
      <div className="mx-3 mb-3 d-flex align-items-center gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <DataTableImport.default
        columns={columns}
        data={products}
        customStyles={customStyles}
        pagination
        paginationServer
        paginationTotalRows={total}
        onChangePage={(page) => fetchProducts(page, perPage, searchQuery)}
        paginationDefaultPage={currentPage}
        paginationPerPage={perPage}
        paginationRowsPerPageOptions={[6, 12, 24, 48]}
        onChangeRowsPerPage={(newPerPage, page) => {
          setPerPage(newPerPage);
          fetchProducts(page, newPerPage, searchQuery);
        }}
        paginationComponentOptions={paginationOptions}
        noDataComponent={<div className="text-center p-4">No hay registros de productos para mostrar</div>}
      />
    </>
  );
};

export default ProductTable;

