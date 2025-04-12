import React, { useState } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    // Hardcoded credentials for validation
    const validEmail = 'test@example.com';
    const validPassword = 'password123';

    if (loginEmail === validEmail && loginPassword === validPassword) {
      // Successful login
      setLoginError('');
      navigate('/dashboard'); // Redirect to dashboard
      alert('Login successful! Redirecting to dashboard...');
    } else {
      // Invalid credentials
      setLoginError('Invalid email or password. Please try again.');
    }
  };
  return (
    <>
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
        <a className="navbar-brand fw-bold fs-3" href="#">MedBridge</a>
        <div className="ms-auto">
          <button className="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
          <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center text-white text-center">
        <div className="container">
          <h1 className="display-4 fw-bold">Smart Medical Record Management</h1>
          <p className="lead">Empowering patients and doctors with secure, decentralized healthcare access.</p>
          <a href="#features" className="btn btn-warning btn-lg mt-3">Explore Features</a>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="mb-4">Our Core Services</h2>
          <div className="row">
            {[
              { icon: 'bi-lock', title: 'Blockchain Security', desc: 'Tamper-proof medical data using Ethereum blockchain.' },
              { icon: 'bi-person-check', title: 'Role-Based Access', desc: 'Patients, doctors, and admins with secure login.' },
              { icon: 'bi-cloud-upload', title: 'Cloud & IPFS Storage', desc: 'Store files reliably and fetch them instantly.' },
            ].map((s, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <i className={`bi ${s.icon} fs-1 text-primary mb-3`}></i>
                    <h5>{s.title}</h5>
                    <p>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5" id="how-it-works">
        <div className="container text-center">
          <h2 className="mb-4">How It Works</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="step-card">
                <h4>1. Register</h4>
                <p>Sign up as a patient or doctor and verify your identity.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-card">
                <h4>2. Upload Records</h4>
                <p>Upload encrypted health data securely to the blockchain.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-card">
                <h4>3. Share & View</h4>
                <p>Grant access to doctors or view your history anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="mb-3">Ready to take control of your health data?</h2>
          <button className="btn btn-light btn-lg" data-bs-toggle="modal" data-bs-target="#signupModal">Get Started</button>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section py-5 text-center">
        <div className="container">
          <h4>Subscribe to our newsletter</h4>
          <p>Get updates on MedBridge features and healthcare tech.</p>
          <div className="d-flex justify-content-center">
            <input type="email" className="form-control w-50 me-2" placeholder="Enter your email" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-dark text-white text-center py-3">
        &copy; 2025 MedBridge. Built with ❤️ for better healthcare.
        <a href="#top" className="btn btn-outline-light btn-sm ms-3">Back to top</a>
      </footer>

  {/* Login Modal */}
  <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Login</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input 
                type="email" 
                className="form-control mb-3" 
                placeholder="Email" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
              />
              <input 
                type="password" 
                className="form-control mb-3" 
                placeholder="Password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
              />
              {loginError && <div className="text-danger mb-3">{loginError}</div>}
              <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title" id="signupModalLabel">Sign Up</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control mb-3" placeholder="Full Name" />
              <input type="email" className="form-control mb-3" placeholder="Email" />
              <input type="password" className="form-control mb-3" placeholder="Password" />
              <button className="btn btn-warning w-100">Create Account</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
