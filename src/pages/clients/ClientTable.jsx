const ClientTable = ({ clients, onDelete, onEdit }) => {
  const handleDelete = async (id) => {        if (window.confirm('¿Está seguro de eliminar este cliente?')) {
          await onDelete(id);
      }
  };
}