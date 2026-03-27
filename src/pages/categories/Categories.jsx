import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
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
    fetchCategories
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
    <FullScreenLoader show={loading} />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Categorias</h3>
        <button 
          className="btn btn-primary" 
          onClick={handleNew}>          
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Nueva Categoría
        </button>
      </div>
      <div className="table-responsive">
        <CategoryTable 
          categories={categories} 
          onDelete={deleteCategory} 
          onEdit={handleEdit}
          currentPage={currentPage}
          lastPage={lastPage}
          total={total}
          fetchCategories={fetchCategories}
          />
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          total={total}
          fetchClients={fetchCategories}
        />
      </div>
      {/* modal */}
      <CategoryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        createCategory={createCategory}
        updateCategory={updateCategory}
        selectedCategory={selectedCategory}
      />
    </>
  );
};
export default Categories;