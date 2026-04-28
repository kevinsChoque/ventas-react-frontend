import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

const TotalsSection = ({ invoiceItems, onSave }) => {
  // Estados para controles
  const [descuentoActivo, setDescuentoActivo] = useState(true);
  const [descuento, setDescuento] = useState(1);
  const [otrosCargosActivo, setOtrosCargosActivo] = useState(true);
  const [otrosCargos, setOtrosCargos] = useState(0);

  // Cálculos
  const { opGravada, igv, subtotal, total } = useMemo(() => {
    const subtotal = invoiceItems.reduce((acc, item) => acc + Number(item.total || 0), 0);
    const opGravada = subtotal / 1.18;
    const igv = subtotal - opGravada;
    let total = subtotal;
    if (descuentoActivo) total -= Number(descuento);
    if (otrosCargosActivo) total += Number(otrosCargos);
    return {
      opGravada,
      igv,
      subtotal,
      total
    };
  }, [invoiceItems, descuentoActivo, descuento, otrosCargosActivo, otrosCargos]);

  return (
    <>  
    <div className="row shadow-lg p-3 mb-5 bg-white rounded" style={{ maxWidth: 400, marginLeft: 'auto', fontSize: 15 }}>
      <div className="col-12 d-flex align-items-center mb-2">
        <span style={{ color: '#1976d2', fontWeight: 600, fontSize: 15 }}>
          <i className="fa fa-info-circle me-1" /> DESCUENTO MONTO
        </span>
        <input type="checkbox" className="form-check-input ms-2" checked={descuentoActivo} onChange={e => setDescuentoActivo(e.target.checked)} />
        <input type="number" min="0" className="form-control ms-2" style={{ width: 70 }} value={descuento} onChange={e => setDescuento(e.target.value)} disabled={!descuentoActivo} />
      </div>
      <div className="col-12 mb-1">OP.GRAVADA: <span style={{ float: 'right' }}>S/ {opGravada.toFixed(2)}</span></div>
      <div className="col-12 mb-1">IGV: <span style={{ float: 'right' }}>S/ {igv.toFixed(2)}</span></div>
      <div className="col-12 mb-1">SUBTOTAL: <span style={{ float: 'right' }}>S/ {subtotal.toFixed(2)}</span></div>
      <div className="col-12 mb-1">DESCUENTOS TOTALES: <span style={{ float: 'right' }}>S/ {descuentoActivo ? descuento : 0}</span></div>
      <div className="col-12 d-flex align-items-center mb-2">
        <span style={{ color: '#1976d2', fontWeight: 600, fontSize: 15 }}>
          OTROS CARGOS - R.C.
        </span>
        <input type="checkbox" className="form-check-input ms-2" checked={otrosCargosActivo} onChange={e => setOtrosCargosActivo(e.target.checked)} />
        <input type="number" min="0" className="form-control ms-2" style={{ width: 70 }} value={otrosCargos} onChange={e => setOtrosCargos(e.target.value)} disabled={!otrosCargosActivo} />
      </div>
      <div className="col-12 mt-2" style={{ fontWeight: 700, fontSize: 17, color: '#23235b' }}>
        TOTAL A PAGAR: <span style={{ float: 'right' }}>S/ {total.toFixed(2)}</span>
      </div>
    </div>
    {/* BOTONES DE ACCIÓN */}
    <div className="d-flex justify-content-end gap-3 mt-3">
      <button className="btn btn-success d-flex align-items-center gap-2 shadow-sm px-4 py-2 rounded-pill fw-bold">
        <FontAwesomeIcon icon={faEye} />
        Vista Previa
      </button>
      <button className="btn btn-outline-secondary d-flex align-items-center gap-2 shadow-sm px-4 py-2 rounded-pill fw-bold">
        <FontAwesomeIcon icon={faTimes} />
        Cancelar
      </button>
      <button
        className="btn btn-primary d-flex align-items-center gap-2 shadow-sm px-4 py-2 rounded-pill fw-bold"
        onClick={() => onSave && onSave({
          opGravada,
          igv,
          subtotal,
          total,
          descuento: descuentoActivo ? Number(descuento) : 0,
          otrosCargos: otrosCargosActivo ? Number(otrosCargos) : 0
        })}
      >
        <FontAwesomeIcon icon={faFileInvoiceDollar} />
        Generar
      </button>
    </div>
    </>
  );
};

export default TotalsSection;