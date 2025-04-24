import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import './Pages.css';

const Features = () => {
  return (
    <>
      <Navbar />
      <div className="page-wrapper container">
        <h1>Features</h1>

        <h4>🔐 Secure Record Storage</h4>
        <p>
          Records are encrypted and stored on IPFS, linked via blockchain for tamper-proof verification.
        </p>

        <h4>👩‍⚕️ Role-Based Access</h4>
        <p>
          Different roles (patients, doctors, admins) have customized access rights to ensure data privacy.
        </p>

        <h4>⚡ Instant Availability</h4>
        <p>
          Your data is accessible 24/7 globally, ideal for emergencies or remote consultations.
        </p>

        <h4>📊 Personalized Dashboards</h4>
        <p>
          Visual dashboards provide summaries, usage statistics, and access logs.
        </p>
      </div>
      <Footer />
    </>
  );
};


export default Features;
