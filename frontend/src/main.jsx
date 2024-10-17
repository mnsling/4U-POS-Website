import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import Scanner from './pages/scanner';
import Transaction from './pages/transaction'
import Inventory from './pages/inventory'
import Return from './pages/returns'
import Stock from './pages/stock'
import Report from './pages/reports'
import Suppliers from './pages/suppliers'
import Records from './pages/records'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Scanner />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/return" element={<Return />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/records" element={<Records />} />
      <Route path="/report" element={<Report />} />
    </Routes>
  </BrowserRouter>
);
