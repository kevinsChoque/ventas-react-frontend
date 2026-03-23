import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Products from './Products';
import './App.css';
import Sidebar from './components/Sidebar';
import Clients from './pages/clients/Clients';

function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-grow-1 bg-light" style={{ minHeight: "100vh" }}>
          {/* Header */}
          <div className="bg-white shadow-sm p-3">
            <h5 className="mb-0">Panel Administrativo</h5>
          </div>
          {/* Contenido */}
          <div className="p-4">
            <div className="card">
              <div className="card-body">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/clients" element={<Clients />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className="card">
    <div className="card-body">
      <h1 className="card-title h3">Bienvenido al Sistema de Ventas</h1>
      <p className="card-text">
        Usa el sidebar para navegar.
      </p>
    </div>
  </div>
);

export default App;
