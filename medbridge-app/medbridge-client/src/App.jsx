// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// import Login from './pages/Login';
// import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { motion } from 'framer-motion';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />*/
          <Route path="/dashboard" element={<Dashboard />} /> }
        </Routes>
    </Router>
  );
}

export default App;
