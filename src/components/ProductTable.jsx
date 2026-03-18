import { confirmDelete, successAlert } from '../helper/alerts';

const ProductTable = ({ products, onDelete, onEdit }) => {
  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      await onDelete(id);
      successAlert("Producto eliminado");
    }
  };
  
  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Unidad</th>
          <th>Nombre</th>
          <th>precio</th>
          <th>stock</th>
          <th>Historial</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.unit?.name || 'N/A'}</td>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{product.stock}</td>
            <td>cas</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(product.id)}>
                eli
              </button>
              <button 
                className="btn btn-secondary btn-sm ms-2"
                onClick={() => onEdit(product)}>
                editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ProductTable;
