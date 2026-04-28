  
import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import api from '../../services/api';
import SelectProductsModal from '../../components/invoices/electronicInvoice/SelectProductsModal';
import SelectedProductsTable from '../../components/invoices/electronicInvoice/SelectedProductsTable';
import TotalsSection from '../../components/invoices/electronicInvoice/TotalsSection';

const ElectronicInvoice = () => {
  // Datos de ejemplo, reemplaza por props o hooks según tu lógica
  const empresa = {
    nombre: "CHOQUE TICONA KEVIN'S EDISON",
    direccion: 'JR. AREQUIPA N° 423',
    email: 'kevins.choque@gmail.com',
  };
  const [ invoiceItems, setInvoiceItems ] = useState(() => {
    const saved = localStorage.getItem('invoiceItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [productEdit, setProductEdit] = useState(null);
  // Guardar productos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('invoiceItems', JSON.stringify(invoiceItems));
  }, [invoiceItems]);
  // Estado para el cliente seleccionado y tipo de comprobante
  const [selectedClient, setSelectedClient] = useState(() => {
    const saved = localStorage.getItem('selectedClient');
    return saved ? JSON.parse(saved) : null;
  });
  const [comprobanteType, setComprobanteType] = useState(() => {
    return localStorage.getItem('comprobanteType') || 'FACTURA ELECTRÓNICA';
  });
  const [showModalProducts, setShowModalProducts] = useState(false);
  
  // Persistir cliente y comprobante en localStorage
  useEffect(() => {
    localStorage.setItem('selectedClient', JSON.stringify(selectedClient));
  }, [selectedClient]);
  useEffect(() => {
    localStorage.setItem('comprobanteType', comprobanteType);
  }, [comprobanteType]);

  const hoy = new Date();
  const fechaEmision = hoy.toISOString().slice(0, 10);
  const fechaVencimiento = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  // Función para cargar clientes desde la API
  const loadClients = async (inputValue, callback) => {
    try {
      const res = await api.get(`/clients?search=${inputValue}`);
      const options = res.data.data.map((cli) => ({
        value: cli.id,
        label: `${cli.name} (${cli.document_type} ${cli.document_number})`,
        ...cli
      }));
      callback(options);
    } catch (error) {
      callback([]);
    }
  };
  const handleEditProduct = (product) => {
    setInvoiceItems(items => items.map(item => item.id === product.id ? { ...item, ...product } : item));
    setProductEdit(null);
    setShowModalProducts(false);
  };
  const handleAddProduct = (product) => {
    setInvoiceItems(items => {
      const idx = items.findIndex(i => i.id === product.id);
      if (idx !== -1) {
        // Si existe, suma cantidad y actualiza datos
        const updated = [...items];
        const existing = updated[idx];
        const newQuantity = Number(existing.quantity) + Number(product.quantity);
        updated[idx] = {
          ...existing,
          ...product,
          quantity: newQuantity,
          subtotal: (newQuantity * product.unitPrice)/ 1.18,
          total: newQuantity * product.unitPrice,
        };
        return updated;
      } else {
        // Si no existe, lo agrega
        return [...items, product];
      }
    });
    // setProductEdit(null);
  };
  const handleRemoveProduct = (id) => {
    setInvoiceItems(items => items.filter(item => item.id !== id));
  };
// Guardar la venta en la API
  const handleSaveInvoice = async ({ opGravada, igv, subtotal, total, descuento, otrosCargos }) => {
    if (!selectedClient || !selectedClient.id) {
      alert("Selecciona un cliente");
      return;
    }
    if (invoiceItems.length === 0) {
      alert("Agrega al menos un producto");
      return;
    }

    const details = invoiceItems.map(item => ({
      product_id: Number(item.id),
      quantity: Number(item.quantity),
      unit_price: Number(item.unitPrice)
    }));

    const payload = {
      voucher_type: comprobanteType,
      client_id: selectedClient.id,
      issue_date: fechaEmision,
      total,
      igv,
      discount: descuento,
      other_charges: otrosCargos,
      subtotal,
      taxable_amount: opGravada,
      details
    };
    console.log('Payload a enviar:', payload);
    try {
      await api.post('/sales', payload);
      alert('Venta guardada correctamente');
      // Opcional: limpiar estados, redirigir, etc.
      // limpiar datos
      setInvoiceItems([]);
      setSelectedClient(null);
      setComprobanteType('FACTURA ELECTRÓNICA');
      localStorage.removeItem('invoiceItems');
      localStorage.removeItem('selectedClient');
      localStorage.removeItem('comprobanteType');
      
    } catch (err) {
      alert('Error al guardar la venta');
    }
  };
  return (
    <>
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
          <div className="row">
            <div className="col-md-6">
              <label className="form-label mb-1" style={{ color: '#1976d2', fontWeight: 700 }}>Tipo comprobante</label>
              <select
                className="form-select"
                style={{ fontWeight: 600, color: '#23235b' }}
                value={comprobanteType}
                onChange={e => setComprobanteType(e.target.value)}
              >
                <option>FACTURA ELECTRÓNICA</option>
                <option>BOLETA ELECTRÓNICA</option>
                <option>NOTA DE VENTA</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label mb-1" style={{ color: '#1976d2', fontWeight: 700 }}>
                Cliente <span style={{ color: '#1976d2', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>[+ Nuevo]</span>
              </label>
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={loadClients}
                value={selectedClient}
                onChange={setSelectedClient}
                placeholder="Buscar cliente por nombre o documento..."
                isClearable
                styles={{
                  control: (base) => ({ ...base, fontWeight: 500, color: '#23235b', minHeight: 38 }),
                  menu: (base) => ({ ...base, zIndex: 9999 })
                }}
              />
            </div>
          </div>
          <hr />
          {/* TABLA DE PRODUCTOS Y BOTÓN AGREGAR */}
          <div className="mb-4">
            <SelectedProductsTable
              invoiceItems={invoiceItems}
              onEdit={item => {
                setProductEdit(item);
                setShowModalProducts(true);
              }}
              onRemove={handleRemoveProduct}
            />
            <div className="mt-4">
              <button
                className="btn btn-primary d-flex align-items-center gap-2 shadow-lg"
                onClick={() => setShowModalProducts(true)}
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

            {/* SECCIÓN DE TOTALES Y DESCUENTOS */}
            <TotalsSection invoiceItems={invoiceItems} onSave={handleSaveInvoice} />
          </div>
        </div>
      </div>
      <SelectProductsModal 
        isOpen={showModalProducts} 
        onClose={() => {
          setShowModalProducts(false);
          setProductEdit(null);
        }} 
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        productEdit={productEdit}
      />
    </>
  );
};

export default ElectronicInvoice;
