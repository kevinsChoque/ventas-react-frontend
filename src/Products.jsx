import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useProducts } from './hooks/useProducts';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';
import FullScreenLoader from './components/FullScreenLoader';

const Products = () => {
  const { 
    products, 
    units,
    loading, 
    loadingAction, 
    error, 
    createProduct, 
    deleteProduct,
    updateProduct
  } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleNew = () => {
    setSelectedProduct(null);
    setShowModal(true);
  }
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  }

  if (loading) return <p className="text-center mt-5">Cargando productos...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className='text-info'>Productos</h1>
        <Button variant="primary" onClick={handleNew}>
          Agregar Producto
        </Button>
      </div>
      {loading || loadingAction ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
          <div className="text-center">
            {/* <div className="spinner-border"></div> */}
            <p>Procesando...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center mt-5">No hay productos registrados</p>
      ) : (
        <ProductTable 
          products={products} 
          onDelete={deleteProduct} 
          onEdit={handleEdit} />
      )}
      {/* <ProductTable 
        products={products} 
        onDelete={deleteProduct}
      /> */}
      <ProductModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        createProduct={createProduct} 
        updateProduct={updateProduct}
        selectedProduct={selectedProduct}
        units={units}
      />
      <FullScreenLoader show={loadingAction} />
    </div>
  );
};
export default Products;