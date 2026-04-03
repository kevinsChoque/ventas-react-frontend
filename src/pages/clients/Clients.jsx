import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { useClients } from '../../hooks/useClients';
import ClientTable from '../../components/clients/ClientTable';
import ClientModal from '../../components/clients/ClientModal';
import FullScreenLoader from '../../components/FullScreenLoader';
import Pagination from '../../components/Pagination';

const Clients = () => {
  const { 
    clients, 
    createClient, 
    deleteClient,
    updateClient,
    loading,
    currentPage,
    lastPage,
    total,
    fetchClients,
    perPage,
    setPerPage,
    searchQuery,
    setSearchQuery
   } = useClients();
  
  const [showModal, setShowModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const handleNew = (e) => {
    setShowModal(true); 
    setSelectedClient(null); 
  }
  const handleEdit = (client) => {
    setSelectedClient(client)
    setShowModal(true)
  }
  return (
    <>
    <div className="d-flex align-items-center justify-content-between bg-body-secondary p-2 border-bottom">
      <div className="d-flex align-items-center gap-1">
        <span className="fw-semibold text-sidebar" style={{ color: '#3b4055' }}>
          {/* <FontAwesomeIcon icon={faTachometerAlt} />  */}
        Clientes</span>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary btn-sm fw-semibold px-3 d-flex align-items-center" onClick={handleNew}>          
          <FontAwesomeIcon icon={faPlus} className="me-1"/> Nuevo
        </button>
      </div>
    </div>
    <div className="p-4">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white border-0 mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0" style={{fontSize: '1.3em', fontWeight: 300, letterSpacing: 'normal', lineHeight: '24px'}}>Listado de Clientes</h3>
          </div>
        </div>
        <div className="card-body p-0">
          <FullScreenLoader show={loading} />
          <div className="table-responsive">
            <ClientTable 
              clients={clients} 
              onDelete={deleteClient} 
              onEdit={handleEdit}
              currentPage={currentPage}
              lastPage={lastPage}
              total={total}
              fetchClients={fetchClients}
              perPage={perPage}
              setPerPage={setPerPage}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              />
          </div>
          <ClientModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            createClient={createClient}
            updateClient={updateClient}
            selectedClient={selectedClient}
          />
        </div>
      </div>
    </div>
    
    </>
  );
};
export default Clients;