import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const SelectedProductsTable = ({ invoiceItems, onEdit, onRemove }) => (
  <table className="table mb-0 table-striped">
    <thead>
      <tr style={{ borderBottom: '2px solid #f1f1f1' }}>
        <th style={{ color: '#6c7a93', fontWeight: 700, background: 'transparent', border: 'none', width: 40 }}>#</th>
        <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none' }}>Descripción</th>
        <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none', minWidth: 100 }}>Unidad</th>
        <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none', minWidth: 100 }}>Cantidad</th>
        <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none', minWidth: 120 }}>Valor Unitario</th>
        <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none', minWidth: 120 }}>Precio Unitario</th>
        <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none', minWidth: 120 }}>Subtotal</th>
        <th style={{ color: '#3b4055', fontWeight: 700, background: 'transparent', border: 'none', minWidth: 120 }}>Total</th>
      </tr>
    </thead>
    <tbody>
      {invoiceItems.map((item, index) => (
        <tr key={index} style={{ borderBottom: '1px solid #f1f1f1' }}>
          <td>{index + 1}</td>
          <td>{item.name}
            <div className='d-flex gap-2 mt-1'>
              <button className='btn btn-outline-primary btn-sm' onClick={() => onEdit(item)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className='btn btn-outline-danger btn-sm' onClick={() => onRemove(item.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </td>
          <td>{item.unit}</td>
          <td>{item.quantity}</td>
          <td>S/ {Number(item.unitValue).toFixed(2)}</td>
          <td>S/ {Number(item.unitPrice).toFixed(2)}</td>
          <td>S/ {Number(item.subtotal).toFixed(2)}</td>
          <td>S/ {Number(item.total).toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SelectedProductsTable;
