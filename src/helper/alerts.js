import Swal from "sweetalert2";

// Confirmación eliminar
export const confirmDelete = () => {
  return Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esto",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  });
};

// Éxito
export const successAlert = (message = "Operación exitosa") => {
  return Swal.fire({
    icon: "success",
    title: message,
    timer: 1500,
    showConfirmButton: false
  });
};

// Error
export const errorAlert = (message = "Ocurrió un error") => {
  return Swal.fire({
    icon: "error",
    title: message
  });
};