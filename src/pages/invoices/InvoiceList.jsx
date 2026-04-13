import React from 'react';

const InvoiceList = () => {
  return (
    <div className="container py-4" style={{ maxWidth: 1100 }}>
      <div className="border rounded shadow p-4 bg-white">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 style={{ color: '#1976d2', fontWeight: 700 }}>Listado de Comprobantes</h3>
          <button
            className="btn"
            style={{ background: '#1976f2', color: '#fff', fontWeight: 600, fontSize: 18, borderRadius: 7, padding: '10px 32px', boxShadow: '0 2px 8px #1976f222' }}
          >
            Nuevo Comprobante
          </button>
        </div>
        <table className="table mb-0">
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f1f1' }}>
              <th style={{ color: '#6c7a93', fontWeight: 700, background: 'transparent', border: 'none', width: 40 }}>#</th>
              <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none' }}>Tipo</th>
              <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none' }}>Serie</th>
              <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none' }}>Número</th>
              <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none' }}>Cliente</th>
              <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none' }}>Fecha Emisión</th>
              <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none' }}>Total</th>
              <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none' }}>Estado</th>
              <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none', minWidth: 120 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Aquí irán los comprobantes listados, por ahora vacío */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
