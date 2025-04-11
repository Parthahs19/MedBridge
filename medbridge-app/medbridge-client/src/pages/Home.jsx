import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import './Home.css';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar bg-white shadow-sm">
        <div className="container nav-inner">
          <Link to="/" className="logo">MedBridge</Link>
          <div>
            <button className="btn btn-outline-primary me-2" onClick={() => setShowLogin(true)}>Login</button>
            <button className="btn btn-primary" onClick={() => setShowSignup(true)}>Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="hero-title">Your Health, Secured with Blockchain</h1>
          <p className="hero-subtitle">Access, share, and manage medical records with trust and transparency.</p>
          <div className="hero-buttons">
            <button className="btn btn-primary me-3" onClick={() => setShowLogin(true)}>Login</button>
            <button className="btn btn-outline-primary" onClick={() => setShowSignup(true)}>Sign Up</button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container text-center">
          <h2 className="section-title">Why Choose MedBridge?</h2>
          <div className="features-grid">
            {[
              {
                title: "Secure Blockchain Storage",
                desc: "All records are encrypted and stored on a decentralized blockchain."
              },
              {
                title: "Patient-Friendly Interface",
                desc: "Designed for patients and doctors to access records with ease."
              },
              {
                title: "24/7 Reliable Access",
                desc: "Access health data anytime, anywhere with full transparency."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
              >
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container text-center">
          <h2 className="section-title">Testimonials</h2>
          <div className="testimonials-grid">
            <div className="testimonial">
              <p>"MedBridge gave me confidence in sharing my health records. It's easy and secure!"</p>
              <h6>- Sarah K., Patient</h6>
            </div>
            <div className="testimonial">
              <p>"A lifesaver for doctors. Everything is accessible, secure, and fast."</p>
              <h6>- Dr. Raj Mehta</h6>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2025 MedBridge | support@medbridge.com</p>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal showModal={showLogin} closeModal={() => setShowLogin(false)} />
      <SignupModal showModal={showSignup} closeModal={() => setShowSignup(false)} />
    </div>
  );
};

export default Home;
