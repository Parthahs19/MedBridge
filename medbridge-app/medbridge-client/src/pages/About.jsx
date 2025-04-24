import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import './Pages.css';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="page-wrapper container">
        <h1>About MedBridge</h1>
        <p className="lead">
          MedBridge is a modern decentralized medical record platform designed to securely connect patients, doctors, and institutions.
        </p>
        <p>
          Unlike traditional systems, MedBridge uses blockchain and IPFS to give patients full control over their health data. It ensures integrity, security, and accessibility of medical records.
        </p>
        <h4>Our Mission</h4>
        <p>
          Build a trusted and interoperable digital health ecosystem that makes access to medical information secure and effortless.
        </p>
        <h4>Our Vision</h4>
        <p>
          Empower every individual with ownership and transparency over their health journey.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
