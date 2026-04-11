import { useSnackbar } from 'notistack';

// Hook reutilizable para notificaciones
export const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Puedes agregar variantes por defecto o personalizar aquí
  const notify = (message, options = {}) => {
    enqueueSnackbar(message, options);
  };

  return notify;
};
