import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlay, faGlasses, faStore, faPen, faCog, faChevronLeft, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-sm rounded-4 px-4 py-2 mb-4 align-items-center" style={{ minHeight: 80 }}>
      <div className="d-flex align-items-center gap-2">
        <button className="btn btn-light rounded-3 p-2"><FontAwesomeIcon icon={faChevronLeft} style={{ color: '#3b4055' }} /></button>
        <button className="btn btn-light rounded-3 px-3 py-2 d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faStar} className="mb-1" style={{ color: '#3b4055' }} />
          <span className="small fw-semibold text-secondary">NC</span>
        </button>
        <button className="btn btn-light rounded-3 px-3 py-2 d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faPlay} className="mb-1" style={{ color: '#3b4055' }} />
          <span className="small fw-semibold text-secondary">POS</span>
        </button>
        <button className="btn btn-light rounded-3 px-3 py-2 d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faGlasses} className="mb-1" style={{ color: '#3b4055' }} />
          <span className="small fw-semibold text-secondary">ME</span>
        </button>
        <button className="btn btn-light rounded-3 px-3 py-2 d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faPen} className="mb-1" style={{ color: '#3b4055' }} />
          <span className="small fw-semibold text-secondary">...</span>
        </button>
      </div>
      <div className="flex-grow-1"></div>
      <div className="d-flex align-items-center gap-4">
        <div className="text-end d-none d-md-block">
          <div className="fw-bold text-secondary">Administrador</div>
          <div className="small text-secondary">{user?.email || 'admin@edu.com'}</div>
        </div>
        <span className="bg-light rounded-circle p-2"><FontAwesomeIcon icon={faUser} size="lg" className="text-secondary" /></span>
      </div>
    </nav>
  );
};

export default Navbar;
