import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import './Pages.css';

const Contact = () => {
    return (
      <>
        <Navbar />
        <div className="page-wrapper container">
          <h1>Contact Us</h1>
          <p className="lead">We’re here to help! Feel free to reach out with your questions or feedback.</p>
  
          <div className="row mt-4">
            <div className="col-md-6">
              <h4>Email</h4>
              <p>support@medbridge.io</p>
  
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
  
              <h4>Address</h4>
              <p>MedBridge HQ, 2nd Floor, HealthTech Park, Bengaluru, India</p>
            </div>
  
            <div className="col-md-6">
              <h4>Send Us a Message</h4>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Your Name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows="4" placeholder="Type your message..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };

export default Contact;
