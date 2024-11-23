import React, { useState } from 'react';
import bg from '../assets/bg.jpg';
import Sidebar from '../components/sidebar';
import SalesReport from '../components/Salesreport';
import CashierReport from '../components/Cashierreport'; // Import the new CashierReport component
import AnalysisReport from '../components/Analysisreport';

const Reports = () => {
  const [page, setPage] = useState('sales');

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Reports</h1>
          <div className='flex gap-4 text-[0.7vw]'>
            <button onClick={() => setPage('sales')} className={`px-4 py-2 ${page === 'sales' ? 'bg-darkp text-white' : 'bg-gray-200 text-darkp'}`}>
              Sales Report
            </button>
            <button onClick={() => setPage('analysis')} className={`px-4 py-2 ${page === 'analysis' ? 'bg-darkp text-white' : 'bg-gray-200 text-darkp'}`}>
              Sales Analysis Report
            </button>
            <button onClick={() => setPage('cashier')} className={`px-4 py-2 ${page === 'cashier' ? 'bg-darkp text-white' : 'bg-gray-200 text-darkp'}`}>
              Cashier Report
            </button>
          </div>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-start mt-10'>
          <h1 className='text-[1.3vw] tracking-tight font-bold px-2 text-darkp'>
            {page === 'sales' ? 'Sales Report' : page === 'cashier' ? 'Cashier Report' : 'Analysis Report'}
          </h1>
          {page === 'sales' && <SalesReport />}
          {page === 'cashier' && <CashierReport />}
          {page === 'analysis' && <AnalysisReport />}
        </div>
      </div>
    </div>
  );
}

export default Reports;