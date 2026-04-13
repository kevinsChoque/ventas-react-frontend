import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faBox, 
  faUsers, 
  faSignOutAlt, 
  faChevronDown, 
  faChevronUp,
  faTags,
  faLayerGroup,
  faAnglesLeft,
  faAnglesRight,
  faStore
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const location = useLocation();
  // Hover temporal cuando esta colapsado
  const [hoverExpanded, setHoverExpanded] = useState(false);
  // 🔥 Estado sidebar colapsado
  const [collapsed, setCollapsed] = useState(() => {
    return JSON.parse(localStorage.getItem("sidebarCollapsed")) || false;
  });
  const isExpanded = !collapsed || hoverExpanded;

  // 🔥 Estado de los dropdowns
  const [openMenus, setOpenMenus] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("openMenus")) || {
        ventas: false,
        modulos: false
      }
    );
  });
  

  // 🔄 Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("openMenus", JSON.stringify(openMenus));
  }, [openMenus]);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  // 🔥 Auto abrir si estás dentro
  useEffect(() => {
    if (
      location.pathname.startsWith("/products") ||
      location.pathname.startsWith("/categories") ||
      location.pathname.startsWith("/brands")
    ) {
      setOpenMenus((prev) => ({ ...prev, modulos: true }));
    }
    if (
      location.pathname.startsWith("/electronic-invoice") ||
      location.pathname.startsWith("/invoice-list")
    ) {
      setOpenMenus((prev) => ({ ...prev, ventas: true }));
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav 
      className={`bg-sidebar text-sidebar border-end`}
      onMouseEnter={() => {
        if (collapsed) setHoverExpanded(true);
      }}
      onMouseLeave={() => {
        if (collapsed) setHoverExpanded(false);
      }}
      style={{
        width: isExpanded ? '250px' : '70px',
        minHeight: '100vh',
        transition: 'width 0.3s ease'
      }}
    >
      <div className={isExpanded ? 'p-3' : 'py-3 px-2'}>

        {/* Marca + boton colapsar */}
        <div className={`d-flex align-items-center mb-4 ${isExpanded ? 'justify-content-between' : 'justify-content-center flex-column gap-2'}`}>
          {isExpanded ? (
            <div className="d-flex align-items-center gap-2">
              <div
                className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                style={{ width: '36px', height: '36px' }}
              >
                <FontAwesomeIcon icon={faStore} />
              </div>
              <div>
                <h6 className="m-0" style={{ color: '#3b4055' }}>NovaMarke</h6>
                <small style={{ color: '#6c757d' }}>Panel Admin</small>
              </div>
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
              style={{ width: '36px', height: '36px' }}
            >
              <FontAwesomeIcon icon={faStore} />
            </div>
          )}

          <button 
            className="btn btn-sm btn-light"
            onClick={() => {
              setCollapsed((prev) => !prev);
              setHoverExpanded(false);
            }}
            title={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            <FontAwesomeIcon icon={collapsed ? faAnglesRight : faAnglesLeft} />
          </button>
        </div>

        <ul className="nav flex-column gap-1">

          {/* HOME */}
          <li>
            <Link 
              className={`nav-link text-white d-flex align-items-center ${isExpanded ? '' : 'justify-content-center'} ${location.pathname === "/home" ? "active" : "kev"}`}
              style={{
                minHeight: '44px',
                borderRadius: '10px',
                padding: isExpanded ? '10px 12px' : '10px 0'
              }}
              to="/home"
            >
              <span className="d-inline-flex align-items-center justify-content-center" style={{ width: '20px' }}>
                <FontAwesomeIcon icon={faHouse} />
              </span>
              {isExpanded && <span className="ms-2 text-sidebar">Home</span>}
            </Link>
          </li>
          <li>
            <Link 
              className={`nav-link text-white d-flex align-items-center ${isExpanded ? '' : 'justify-content-center'} ${location.pathname === "/test" ? "active" : "kev"}`}
              style={{
                minHeight: '44px',
                borderRadius: '10px',
                padding: isExpanded ? '10px 12px' : '10px 0'
              }}
              to="/test"
            >
              <span className="d-inline-flex align-items-center justify-content-center" style={{ width: '20px' }}>
                <FontAwesomeIcon icon={faHouse} />
              </span>
              {isExpanded && <span className="ms-2 text-sidebar">test</span>}
            </Link>
          </li>
          {/* VENTAS */}
          <li className="nav-item">
            <button
              className={`nav-link text-white w-100 d-flex align-items-center ${isExpanded ? 'text-start justify-content-between' : 'justify-content-center'}`}
              onClick={() => setOpenMenus((prev) => ({ ...prev, ventas: !prev.ventas }))}
              style={{
                minHeight: '44px',
                borderRadius: '10px',
                padding: isExpanded ? '10px 12px' : '10px 0',
              }}
            >
              <span className="d-flex align-items-center">
                <span className="d-inline-flex align-items-center justify-content-center" style={{ width: '20px' }}>
                  <FontAwesomeIcon icon={faBox} />
                </span>
                {isExpanded && <span className="ms-2">Ventas</span>}
              </span>

              {isExpanded && (
                <FontAwesomeIcon icon={openMenus.ventas ? faChevronUp : faChevronDown} />
              )}
            </button>
            {/* 🔥 ANIMACIÓN SUAVE */}
            <div
              style={{
                maxHeight: openMenus.ventas && isExpanded ? '200px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease'
              }}
            >
              <ul className="nav flex-column ms-3">
                <li>
                  <Link to="/electronic-invoice"
                    className={`nav-link text-white d-flex align-items-center ${location.pathname.startsWith("/electronic-invoice") ? "active" : ""}`}
                    style={{
                      minHeight: '40px',
                      borderRadius: '10px',
                      padding: '8px 12px'
                    }}
                  >
                    <span className="d-inline-flex align-items-center justify-content-center" style={{ width: '20px' }}>
                      <FontAwesomeIcon icon={faBox} />
                    </span>
                    {isExpanded && <span className="ms-2">Comprobante electrónico</span>}
                  </Link>
                </li>
                <li>
                  <Link to="/invoice-list"
                    className={`nav-link text-white d-flex align-items-center ${location.pathname.startsWith("/invoice-list") ? "active" : ""}`}
                    style={{
                      minHeight: '40px',
                      borderRadius: '10px',
                      padding: '8px 12px'
                    }}
                  >
                    <span className="d-inline-flex align-items-center justify-content-center" style={{ width: '20px' }}>
                      <FontAwesomeIcon icon={faLayerGroup} />
                    </span>
                    {isExpanded && <span className="ms-2">Listado de comprobantes</span>}
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          {/* PRODUCTOS */}
          <li className="nav-item">
            <button
              className={`nav-link text-white w-100 d-flex align-items-center ${isExpanded ? 'text-start justify-content-between' : 'justify-content-center'}`}
              onClick={() => setOpenMenus((prev) => ({ ...prev, modulos: !prev.modulos }))}
              style={{
                minHeight: '44px',
                borderRadius: '10px',
                padding: isExpanded ? '10px 12px' : '10px 0',
              }}
            >
              <span className="d-flex align-items-center">
                <span className="d-inline-flex align-items-center justify-content-center" style={{ width: '20px' }}>
                  <FontAwesomeIcon icon={faBox} />
                </span>
                {isExpanded && <span className="ms-2">Modulos</span>}
              </span>

              {isExpanded && (
                <FontAwesomeIcon icon={openMenus.modulos ? faChevronUp : faChevronDown} />
              )}
            </button>

            {/* 🔥 ANIMACIÓN SUAVE */}
            <div
              style={{
                maxHeight: openMenus.modulos && isExpanded ? '200px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease'
              }}
            >
              <ul className="nav flex-column ms-3">
                <li>
                  <Link to="/products" 
                    className={`nav-link text-white d-flex align-items-center ${location.pathname.startsWith("/products") ? "active" : ""}`}
                    style={{
                      minHeight: '40px',
                      borderRadius: '10px',
                      padding: '8px 12px'
                    }}
                    >
                    <span className="d-inline-flex align-items-center justify-content-center" style={{ width: '20px' }}>
                      <FontAwesomeIcon icon={faBox} />
                    </span>
                    {isExpanded && <span className="ms-2">Productos</span>}
                  </Link>
                </li>

                <li>
                  <Link to="/categories" 
                    className={`nav-link text-white d-flex align-items-center ${location.pathname.startsWith("/categories") ? "active" : ""}`}
                    style={{
                      minHeight: '40px',
                      borderRadius: '10px',
                      padding: '8px 12px'
                    }}>
                    <span className="d-inline-flex align-items-center justify-content-center" style={{ width: '20px' }}>
                      <FontAwesomeIcon icon={faLayerGroup} />
                    </span>
                    {isExpanded && <span className="ms-2">Categorías</span>}
                  </Link>
                </li>

                <li>
                  <Link to="/brands" 
                    className={`nav-link text-white d-flex align-items-center ${location.pathname.startsWith("/brands") ? "active" : ""}`}
                    style={{
                      minHeight: '40px',
                      borderRadius: '10px',
                      padding: '8px 12px'
                    }}>
                    <span className="d-inline-flex align-items-center justify-content-center" style={{ width: '20px' }}>
                      <FontAwesomeIcon icon={faTags} />
                    </span>
                    {isExpanded && <span className="ms-2">Marcas</span>}
                  </Link>
                </li>

              </ul>
            </div>
          </li>

          {/* CLIENTES */}
          <li>
            <Link 
              className={`nav-link text-white d-flex align-items-center ${isExpanded ? '' : 'justify-content-center'} ${location.pathname.startsWith("/clients") ? "active" : "kev"}`}
              style={{
                minHeight: '44px',
                borderRadius: '10px',
                padding: isExpanded ? '10px 12px' : '10px 0'
              }}
              to="/clients"
            >
              <span className="d-inline-flex align-items-center justify-content-center" style={{ width: '20px' }}>
                <FontAwesomeIcon icon={faUsers} />
              </span>
              {isExpanded && <span className="ms-2">Clientes</span>}
            </Link>
          </li>

          {/* LOGOUT */}
          <li>
            <button 
              className={`nav-link text-white bg-danger rounded mt-3 w-100 d-flex align-items-center ${isExpanded ? '' : 'justify-content-center'}`}
              onClick={handleLogout}
              style={{
                minHeight: '44px',
                borderRadius: '10px',
                padding: isExpanded ? '10px 12px' : '10px 0'
              }}
            >
              <span className="d-inline-flex align-items-center justify-content-center" style={{ width: '20px' }}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
              {isExpanded && <span className="ms-2">Cerrar sesión</span>}
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;