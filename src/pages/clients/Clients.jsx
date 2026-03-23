import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
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
    fetchClients
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
    <FullScreenLoader show={loading} />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Clientes</h3>
        <button 
          className="btn btn-primary" 
          onClick={handleNew}>          
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Nuevo Cliente
        </button>
      </div>
      <div className="table-responsive">
        <ClientTable 
          clients={clients} 
          onDelete={deleteClient} 
          onEdit={handleEdit}
          currentPage={currentPage}
          lastPage={lastPage}
          total={total}
          fetchClients={fetchClients}
          />
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          total={total}
          fetchClients={fetchClients}
        />
      </div>
      {/* modal */}
      <ClientModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        createClient={createClient}
        updateClient={updateClient}
        selectedClient={selectedClient}
      />
    </>
  );
};
export default Clients;