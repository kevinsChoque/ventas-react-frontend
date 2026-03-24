import { Link, useLocation } from "react-router-dom";
import api from "../services/api";

const Sidebar = () => {
  const location = useLocation();
  const handleLogout = async () => {
    try {
        await api.post('/logout');
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
    } catch (error) {console.error("Error al cerrar sesión:", error);}
  };
  return (
    <nav className="bg-dark text-white border-end" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3">
        <h5 className="mb-4 text-center">Sistema</h5>
        <ul className="nav flex-column">
          <li>
            <Link 
              className={`nav-link text-white ${location.pathname === "/home" ? "active bg-secondary rounded" : ""}`} 
              to="/home">
              🏠 Home
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link 
              className={`nav-link text-white ${location.pathname === "/" ? "active bg-secondary rounded" : ""}`} 
              to="/">
              🏠 Inicio
            </Link>
          </li> */}
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
          {/* <li>
            <Link 
              className={`nav-link text-white ${location.pathname === "/login" ? "active bg-secondary rounded" : ""}`} 
              to="/login">
              🔐 Login
            </Link>
          </li> */}
          <li>
            <button 
              className="nav-link text-white bg-danger rounded mt-3 w-100"
              onClick={handleLogout}
            >
              🚪 Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Sidebar;