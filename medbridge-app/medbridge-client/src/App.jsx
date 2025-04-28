// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
              <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <DoctorDashboard/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard/>
            </ProtectedRoute>
          }
        />
          <Route path="/login" element = {<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
    </Router>
  );
}

export default App;
