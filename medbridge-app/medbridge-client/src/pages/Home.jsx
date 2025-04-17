import React from 'react'; 
import { Link } from 'react-router-dom';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-hospital px-4 py-3">
        <Link className="navbar-brand fw-bold fs-3" to="/">MedBridge</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ms-auto" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/features">Features</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            <li className="nav-item"><Link className="btn btn-outline-light ms-2" to="/login">Login</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section text-white d-flex align-items-center justify-content-center">
        <div className="hero-container text-left">
          <h1 className="display-4 fw-bold">Next-Gen Medical Record System</h1>
          <p className="lead">Secure | Smart | Decentralized</p>
          <Link to="/features" className="btn btn-warning btn-lg mt-3">Explore Features</Link>
        </div>
      </section>

      {/* Sections */}
      <section className="section-blue text-white py-5">
        <div className="container text-center">
          <h2>Why MedBridge?</h2>
          <p className="lead w-75 mx-auto">We connect patients, doctors, and hospitals in one secure place powered by blockchain.</p>
        </div>
      </section>

      <section className="section-white py-5">
        <div className="container text-center">
          <h2>Key Services</h2>
          <div className="row mt-4">
            <div className="col-md-4"><h4>🛡️ Secure Storage</h4><p>Encrypted IPFS + Blockchain for tamper-proof health records.</p></div>
            <div className="col-md-4"><h4>👩‍⚕️ Role-Based Access</h4><p>Only authorized roles can view or edit patient data.</p></div>
            <div className="col-md-4"><h4>⚡ Real-Time Access</h4><p>Anywhere, anytime — for both patients and doctors.</p></div>
          </div>
        </div>
      </section>

      <section className="section-blue text-white py-5 text-center">
        <div className="container">
          <h2>Take Control of Your Health Records</h2>
          <Link to="/signup" className="btn btn-light btn-lg mt-3">Get Started</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer text-white text-center py-3">
        &copy; 2025 MedBridge | Smart Health. Secure Life.
      </footer>
    </>
  );
};

export default Home;
