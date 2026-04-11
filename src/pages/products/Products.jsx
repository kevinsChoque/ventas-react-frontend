import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons'
import { useProducts } from '../../hooks/useProducts';
import ProductTable from '../../components/products/ProductTable';
import ProductModal from '../../components/products/ProductModal';
import FullScreenLoader from '../../components/FullScreenLoader';

const Products = () => {
  const {
    products,
    units,
    loading,
    currentPage,
    lastPage,
    total,
    fetchProducts,
    perPage,
    setPerPage,
    searchQuery,
    setSearchQuery,
    createProduct,
    deleteProduct,
    updateProduct,
  } = useProducts();

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleNew = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between bg-body-secondary p-2 border-bottom">
        <div className="d-flex align-items-center gap-1">
          <span className="fw-semibold" style={{ color: '#3b4055' }}>Productos</span>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm fw-semibold px-3 d-flex align-items-center" onClick={handleNew}>          
            <FontAwesomeIcon icon={faFileExport} className="me-1"/> Exportar
          </button>
          <button className="btn btn-primary btn-sm fw-semibold px-3 d-flex align-items-center" onClick={handleNew}>          
            <FontAwesomeIcon icon={faFileImport} className="me-1"/> Importar
          </button>
          <button className="btn btn-primary btn-sm fw-semibold px-3 d-flex align-items-center" onClick={handleNew}>
            <FontAwesomeIcon icon={faPlusCircle} className="me-1" /> Nuevo
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white border-0 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mb-0" style={{ fontSize: '1.3em', fontWeight: 300, letterSpacing: 'normal', lineHeight: '24px' }}>Listado de Productos</h3>
            </div>
          </div>
          <div className="card-body p-0">
            <FullScreenLoader show={loading} />
            <div className="table-responsive">
              <ProductTable
                products={products}
                onDelete={deleteProduct}
                onEdit={handleEdit}
                currentPage={currentPage}
                lastPage={lastPage}
                total={total}
                fetchProducts={fetchProducts}
                perPage={perPage}
                setPerPage={setPerPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
            <ProductModal
              show={showModal}
              onClose={() => setShowModal(false)}
              createProduct={createProduct}
              updateProduct={updateProduct}
              selectedProduct={selectedProduct}
              units={units}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Products;
