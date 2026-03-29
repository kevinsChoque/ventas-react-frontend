import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus, faBox } from '@fortawesome/free-solid-svg-icons'
import { faPlus, faFileExport, faFileImport, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import BrandTable from '../../components/brands/BrandTable';
import BrandModal from '../../components/brands/BrandModal';
import FullScreenLoader from '../../components/FullScreenLoader';
import { useBrands } from "../../hooks/useBrands";
import Pagination from '../../components/Pagination';

const Brands = () => {
  const { 
    brands, 
    createBrand, 
    deleteBrand,
    updateBrand,
    loading,
    currentPage,
    lastPage,
    total,
    fetchBrands
   } = useBrands();
  
  const [showModal, setShowModal] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const handleNew = (e) => {
    setShowModal(true); 
    setSelectedBrand(null); 
  }
  const handleEdit = (brand) => {
    setSelectedBrand(brand)
    setShowModal(true)
  }
  return (
    <>
    <div className="d-flex align-items-center justify-content-between bg-body-secondary p-2 border-bottom">
      <div className="d-flex align-items-center gap-1">
        <span className="fw-semibold text-sidebar" style={{ color: '#3b4055' }}><FontAwesomeIcon icon={faTachometerAlt} /> Marcas</span>
      </div>
      <div className="d-flex gap-2">
        {/* <button className="btn btn-primary btn-sm fw-semibold px-3 d-flex align-items-center" onClick={handleNew}>          
          <FontAwesomeIcon icon={faFileExport} className="me-1"/> Exportar
        </button>
        <button className="btn btn-primary btn-sm fw-semibold px-3 d-flex align-items-center" onClick={handleNew}>          
          <FontAwesomeIcon icon={faFileImport} className="me-1"/> Importar
        </button> */}
        <button className="btn btn-primary btn-sm fw-semibold px-3 d-flex align-items-center" onClick={handleNew}>          
          <FontAwesomeIcon icon={faPlus} className="me-1"/> Nueva
        </button>
      </div>
    </div>
    <div className="p-4">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white border-0 mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0" style={{fontSize: '1.6em', fontWeight: 300, letterSpacing: 'normal', lineHeight: '24px'}}>Listado de Marcas</h3>
            {/* <button 
              className="btn btn-info btn-sm" 
              onClick={handleNew}>          
              <FontAwesomeIcon icon={faPlus} className="me-1" />
              Nueva
            </button> */}
          </div>
        </div>
        {/* <div className="card-body px-1"> */}
            <FullScreenLoader show={loading} />
            <div className="table-responsive">
              <BrandTable 
                brands={brands} 
                onDelete={deleteBrand} 
                onEdit={handleEdit}
                currentPage={currentPage}
                lastPage={lastPage}
                total={total}
                fetchBrands={fetchBrands}
                />
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                total={total}
                fetchClients={fetchBrands}
              />
            </div>
            {/* modal */}
            <BrandModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              createBrand={createBrand}
              updateBrand={updateBrand}
              selectedBrand={selectedBrand}
            />
        {/* </div> */}
      </div>
    </div>
    </>
  );
};
export default Brands;