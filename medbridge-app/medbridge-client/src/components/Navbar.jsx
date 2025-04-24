import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // 👈 Ensure this is imported

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-hospital px-4 py-3">
      <Link className="navbar-brand brand-lg" to="/">MedBridge</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse ms-auto" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link nav-link-lg" to="/home">Home</Link></li>
          <li className="nav-item"><Link className="nav-link nav-link-lg" to="/about">About</Link></li>
          <li className="nav-item"><Link className="nav-link nav-link-lg" to="/features">Features</Link></li>
          <li className="nav-item"><Link className="nav-link nav-link-lg" to="/contact">Contact</Link></li>
          <li className="nav-item"><Link className="btn btn-outline-light ms-2 nav-link-btn" to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
