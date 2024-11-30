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

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/sinventory" element={<Second />} />
      <Route path="/return" element={<Return />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/records" element={<Records />} />
      <Route path="/report" element={<Report />} />
      <Route path="/open" element={<Open />} />
      <Route path="/move" element={<Move />} />
      <Route path="/out" element={<Out />} />
      <Route path="/rp" element={<RP />} />
      <Route path="/repack" element={<Repack />} />
    </Routes>
  </BrowserRouter>
);