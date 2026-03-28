import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlay, faGlasses, faStore, faPen, faCog, faChevronLeft, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white shadow-sm px-3 py-0 align-items-center" style={{ minHeight: 60 }}>
      <div className="d-flex align-items-center gap-1">
        <button className="btn btn-light rounded-3 p-2"><FontAwesomeIcon icon={faChevronLeft} style={{ color: '#3b4055' }} /></button>
        <button className="btn btn-light rounded-3 px-3 py-2 d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faStar} style={{ color: '#3b4055' }} />
          <span className="small fw-semibold text-secondary">NC</span>
        </button>
        <button className="btn btn-light rounded-3 px-3 py-2 d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faPlay} style={{ color: '#3b4055' }} />
          <span className="small fw-semibold text-secondary">POS</span>
        </button>
        <button className="btn btn-light rounded-3 px-3 py-2 d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faGlasses} style={{ color: '#3b4055' }} />
          <span className="small fw-semibold text-secondary">ME</span>
        </button>
        <button className="btn btn-light rounded-3 px-3 py-2 d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faPen} style={{ color: '#3b4055' }} />
          <span className="small fw-semibold text-secondary">...</span>
        </button>
      </div>
      <div className="flex-grow-1"></div>
      <div className="d-flex align-items-center gap-4">
        <div className="text-end d-none d-md-block">
          <div className="fw-bold text-secondary">Administrador</div>
          <div className="small text-secondary">{user?.email || 'admin@edu.com'}</div>
        </div>
        <span className="bg-body-secondary rounded-3 p-2"><FontAwesomeIcon icon={faUser} size="lg" className="text-secondary" /></span>
      </div>
    </nav>
  );
};

export default Navbar;
