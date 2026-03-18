import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Products from './Products';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar */}
        <nav className="bg-light border-end" style={{ width: '250px', minHeight: '100vh' }}>
          <div className="p-3">
            <h5 className="mb-3">Sistema de Ventas</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Productos
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-grow-1">
          {/* <div className="container py-5"> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          {/* </div> */}
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
