import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import CategoryTable from '../../components/categories/CategoryTable';
import CategoryModal from '../../components/categories/CategoryModal';
import FullScreenLoader from '../../components/FullScreenLoader';
import { useCategories } from "../../hooks/useCategories";
import Pagination from '../../components/Pagination';

const Categories = () => {
  const { 
    categories, 
    createCategory, 
    deleteCategory,
    updateCategory,
    loading,
    currentPage,
    lastPage,
    total,
    fetchCategories,
    perPage,
    setPerPage,
    searchQuery,
    setSearchQuery
   } = useCategories();
  
  const [showModal, setShowModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleNew = (e) => {
    setShowModal(true); 
    setSelectedCategory(null); 
  }
  const handleEdit = (category) => {
    setSelectedCategory(category)
    setShowModal(true)
  }
  return (
    <>
    <div className="d-flex align-items-center justify-content-between bg-body-secondary p-2 border-bottom">
      <div className="d-flex align-items-center gap-1">
        <span className="fw-semibold text-sidebar" style={{ color: '#3b4055' }}>
          {/* <FontAwesomeIcon icon={faTachometerAlt} />  */}
          Categorías
        </span>
      </div>
      <div className="d-flex gap-2">
        {/* <button className="btn btn-primary btn-sm fw-semibold px-3 d-flex align-items-center" onClick={handleNew}>          
          <FontAwesomeIcon icon={faFileExport} className="me-1"/> Exportar
        </button>
        <button className="btn btn-primary btn-sm fw-semibold px-3 d-flex align-items-center" onClick={handleNew}>          
          <FontAwesomeIcon icon={faFileImport} className="me-1"/> Importar
        </button> */}
        <button className="btn btn-primary btn-sm fw-semibold px-3 d-flex align-items-center" onClick={handleNew}>          
          <FontAwesomeIcon icon={faPlusCircle} className="me-1"/> Nueva
        </button>
      </div>
    </div>
    <div className="p-4">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white border-0 mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0" style={{fontSize: '1.3em', fontWeight: 300, letterSpacing: 'normal', lineHeight: '24px'}}>Listado de Categorías</h3>
          </div>
        </div>
        <div className="card-body p-0">
            <FullScreenLoader show={loading} />
            <div className="table-responsive">
              <CategoryTable 
                categories={categories} 
                onDelete={deleteCategory} 
                onEdit={handleEdit}
                currentPage={currentPage}
                lastPage={lastPage}
                total={total}
                fetchCategories={fetchCategories}
                perPage={perPage}
                setPerPage={setPerPage}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                />
              {/* <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                total={total}
                fetchClients={fetchCategories}
              /> */}
            </div>
            {/* modal */}
            <CategoryModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              createCategory={createCategory}
              updateCategory={updateCategory}
              selectedCategory={selectedCategory}
            />
        </div>
      </div>
    </div>
    </>
  );
};
export default Categories;