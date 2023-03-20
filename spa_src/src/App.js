import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/index.js';
import Customer from './Pages/Customer/index.js';
import Employee from './Pages/Employee/index.js';
import './App.css';
function App() {
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/Customer" element={<Customer />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}

export default App;
