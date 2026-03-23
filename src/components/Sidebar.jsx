import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <nav className="bg-dark text-white border-end" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3">
        <h5 className="mb-4 text-center">Sistema</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link 
              className={`nav-link text-white ${location.pathname === "/" ? "active bg-secondary rounded" : ""}`} 
              to="/">
              🏠 Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link text-white ${location.pathname === "/products" ? "active bg-secondary rounded" : ""}`} 
              to="/products">
              📦 Productos
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              className={`nav-link text-white ${location.pathname === "/clients" ? "active bg-secondary rounded" : ""}`} 
              to="/clients">
              📦 Clientes
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Sidebar;