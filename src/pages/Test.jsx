import React from 'react';
import { useSnackbar } from 'notistack';

const Test = () => {
  const { enqueueSnackbar } = useSnackbar();
  const mostrarNotificacion = () => {
    enqueueSnackbar('¡Notificación de prueba exitosa!', { variant: 'success' });
  };
  return (
    <div className="container mt-4">
      <h1>test</h1>
      <button className="btn btn-primary mt-3" onClick={mostrarNotificacion}>
        Mostrar notificación
      </button>
    </div>
  );
};
export default Test;
