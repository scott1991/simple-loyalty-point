import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/index.js';
import Client from './Pages/Client/index.js';
import Employee from './Pages/Employee/index.js';
import './App.css';
function App() {
  return (
    <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Employee" element={<Employee />} />
          <Route path="/Client" element={<Client />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}

export default App;
