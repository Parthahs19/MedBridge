// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Dashboard from './pages/Dashboard';
import { motion } from 'framer-motion';

function App() {
  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;
