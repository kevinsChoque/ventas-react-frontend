import React from 'react';

const ElectronicInvoice = () => {
  // Datos de ejemplo, reemplaza por props o hooks según tu lógica

  const empresa = {
    nombre: "CHOQUE TICONA KEVIN'S EDISON",
    direccion: 'JR. AREQUIPA N° 423',
    email: 'kevins.choque@gmail.com',
  };

  // Fechas ejemplo
  const hoy = new Date();
  const fechaEmision = hoy.toISOString().slice(0, 10);
  const fechaVencimiento = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const cliente = {
    nombre: 'Juan Pérez',
    documento: 'DNI 12345678',
    direccion: 'Calle Secundaria 456, Lima',
  };

  const items = [
    { cantidad: 2, descripcion: 'Producto A', precio: 50 },
    { cantidad: 1, descripcion: 'Producto B', precio: 100 },
  ];

  const total = items.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <div className="border rounded shadow p-4 bg-white">
        {/* CABECERA TIPO FACTURA */}
        <div className="d-flex align-items-center justify-content-between mb-3" style={{ gap: 24 }}>
          {/* Logo */}
          <div style={{ minWidth: 120, maxWidth: 120, background: '#f5f5f7', borderRadius: 6, height: 100 }} className="d-flex align-items-center justify-content-center">
            <span style={{ color: '#4b4b7e', fontWeight: 500, fontSize: 38, letterSpacing: 2, textAlign: 'center', lineHeight: 1 }}>
              Tu<br />logo
            </span>
          </div>
          {/* Datos empresa */}
          <div className="flex-grow-1">
            <div style={{ fontWeight: 700, color: '#5a6a85', fontSize: 20 }}>{empresa.nombre}</div>
            <div style={{ color: '#6c757d', fontWeight: 500, fontSize: 15 }}>{empresa.direccion}</div>
            <div style={{ color: '#6c757d', fontSize: 15 }}>{empresa.email}</div>
          </div>
          {/* Fechas */}
          <div className="d-flex flex-column flex-md-row align-items-center gap-3">
            <div className="text-center">
              <div style={{ color: '#6c757d', fontWeight: 500 }}>Fec. Emisión</div>
              <input type="text" className="form-control text-center" style={{ minWidth: 140, fontWeight: 500, fontSize: 18 }} value={fechaEmision} readOnly />
            </div>
            <div className="text-center">
              <div style={{ color: '#6c757d', fontWeight: 500 }}>Fec. Vencimiento</div>
              <input type="text" className="form-control text-center" style={{ minWidth: 140, fontWeight: 500, fontSize: 18 }} value={fechaVencimiento} readOnly />
            </div>
          </div>
        </div>
        <hr />
        {/* SECCIÓN DE DATOS DE COMPROBANTE */}
        <div className="mb-3">
          <div className="row g-3 align-items-end">
            <div className="col-md-6">
              <label className="form-label mb-1" style={{ color: '#1976d2', fontWeight: 700 }}>Tipo comprobante</label>
              <select className="form-select" style={{ fontWeight: 600, color: '#23235b' }} defaultValue="FACTURA ELECTRÓNICA">
                <option>FACTURA ELECTRÓNICA</option>
                <option>BOLETA ELECTRÓNICA</option>
                <option>NOTA DE VENTA</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label mb-1" style={{ color: '#5a6a85', fontWeight: 600 }}>Serie</label>
              <select className="form-select" style={{ fontWeight: 600, color: '#23235b' }} defaultValue="F001">
                <option>F001</option>
                <option>B001</option>
              </select>
            </div>
            {/* <div className="col-md-2">
              <label className="form-label mb-1" style={{ color: '#5a6a85', fontWeight: 600 }}>Moneda</label>
              <select className="form-select" style={{ fontWeight: 600, color: '#23235b' }} defaultValue="Soles">
                <option>Soles</option>
                <option>Dólares</option>
              </select>
            </div> */}
            <div className="col-md-3">
              <label className="form-label mb-1 d-flex align-items-center gap-1" style={{ color: '#5a6a85', fontWeight: 600 }}>
                Tipo de cambio
                <span title="Tipo de cambio SUNAT" style={{ cursor: 'pointer', color: '#1976d2', fontSize: 15 }}><i className="fas fa-info-circle"></i></span>
              </label>
              <input type="text" className="form-control text-end" style={{ fontWeight: 600, color: '#23235b' }} value="3.385" readOnly />
            </div>
          </div>
          {/* Cliente */}
          <div className="row mt-4">
            <div className="col-md-6">
              <label className="form-label mb-1" style={{ color: '#1976d2', fontWeight: 700 }}>
                Cliente <span style={{ color: '#1976d2', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>[+ Nuevo]</span>
              </label>
              <input type="text" className="form-control" style={{ fontWeight: 500, color: '#b0b0b0' }} placeholder="Escriba el nombre o número de documento del cliente" disabled />
            </div>
          </div>
        </div>
        <hr />
        {/* TABLA DE PRODUCTOS Y BOTÓN AGREGAR */}
        <div className="mb-4">
          <table className="table mb-0" style={{ border: 'none' }}>
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
              {/* Aquí irán los productos agregados, por ahora vacío */}
            </tbody>
          </table>
          <div className="mt-4">
            <button
              className="btn"
              style={{ background: '#1976f2', color: '#fff', fontWeight: 600, fontSize: 20, borderRadius: 7, padding: '10px 32px', boxShadow: '0 2px 8px #1976f222' }}
            >
              Agregar Producto
              <span style={{
                background: '#fff',
                color: '#23235b',
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 4,
                marginLeft: 12,
                padding: '2px 8px',
                border: '1px solid #e0e0e0',
                boxShadow: '0 1px 2px #0001',
                verticalAlign: 'middle',
                display: 'inline-block'
              }}>F2</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicInvoice;
