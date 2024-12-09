import React, { useState } from 'react';
import bg from '../assets/bg.jpg';
import Sidebar from '../components/sidebar';
import CashierReport from '../components/Cashierreport'; // Import the new CashierReport component

const Reports = () => {
  const [page, setPage] = useState('cashier');

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Cash Count</h1>
          <div className='flex gap-4 text-[0.7vw]'>
          </div>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-start mt-10'>
          {page === 'cashier' && <CashierReport />}
        </div>
      </div>
    </div>
  );
}

export default Reports;