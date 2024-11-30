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
import Records from './pages/records'
import Suppliers from './pages/suppliers'
import Open from './pages/openstock'
import Move from './pages/movestock'
import Out from './pages/stockout'
import Second from './pages/sinventory'
import RP from './pages/RP'
import Repack from './pages/repack'
import './index.css';
import ProtectedRoute from './components/ProtectedRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/scanner" element={<ProtectedRoute><Scanner /></ProtectedRoute>} />
      <Route path="/transaction" element={<ProtectedRoute><Transaction /></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
      <Route path="/sinventory" element={<ProtectedRoute><Second /></ProtectedRoute>} />
      <Route path="/return" element={<ProtectedRoute><Return /></ProtectedRoute>} />
      <Route path="/stock" element={<ProtectedRoute><Stock /></ProtectedRoute>} />
      <Route path="/suppliers" element={<ProtectedRoute><Suppliers /></ProtectedRoute>} />
      <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />
      <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
      <Route path="/open" element={<ProtectedRoute><Open /></ProtectedRoute>} />
      <Route path="/move" element={<ProtectedRoute><Move /></ProtectedRoute>} />
      <Route path="/out" element={<ProtectedRoute><Out /></ProtectedRoute>} />
      <Route path="/rp" element={<ProtectedRoute><RP /></ProtectedRoute>} />
      <Route path="/repack" element={<ProtectedRoute><Repack /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
);