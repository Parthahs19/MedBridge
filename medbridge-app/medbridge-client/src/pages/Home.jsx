import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center">
  <div className="container">
    <div className="row">
      <div className="col-md-8">
        <div className="hero-container text-left">
          <h1 className="display-4 fw-bold">Next-Gen Medical Record System</h1>
          <p className="lead">Secure | Smart | Decentralized</p>
          <Link to="/features" className="btn btn-warning btn-lg mt-3">Explore Features</Link>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Why MedBridge */}
      <section className="section-blue text-white py-5">
        <div className="container text-center">
          <h2>Why MedBridge?</h2>
          <p className="lead w-75 mx-auto">We connect patients, doctors, and hospitals in one secure place powered by blockchain.</p>
        </div>
      </section>

      {/* Key Services */}
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

      {/* Call to Action */}
      <section className="section-blue text-white py-5 text-center">
        <div className="container">
          <h2>Take Control of Your Health Records</h2>
          <Link to="/signup" className="btn btn-light btn-lg mt-3">Get Started</Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
