import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/4Uw.png';
import scanner from '../assets/scan.png';
import transaction from '../assets/transaction.png';
import inventory from '../assets/inventory.png';
import returnp from '../assets/product-return.png';
import stock from '../assets/now-in-stock.png';
import bar from '../assets/bar-chart.png';
import right from '../assets/arrow-right.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isStockInOpen, setIsStockInOpen] = useState(false);

  const handleScanner = () => {
    navigate('/scanner');
  };

  const handleTransaction = () => {
    navigate('/transaction');
  };

  const handleInventory = () => {
    navigate('/');
  };

  const handleReturn = () => {
    navigate('/return');
  };

  const handleStock = () => {
    navigate('/stock');
  };

  const handleReport = () => {
    navigate('/report');
  };

  const handleLogout = () => {
    navigate('/logout');
  };

  const toggleStockInDropdown = () => {
    setIsStockInOpen(!isStockInOpen);
  };

  const handleSupplier = () => {
    navigate('/suppliers');
  };

  const handleStockRecords = () => {
    navigate('/records');
  };

  return (
    <div className='w-[16.67vw] h-screen font-poppins bg-darkp relative z-20'>
      <div className='w-full h-full flex flex-col gap-20 z-20 relative'>
        <img src={logo} className='w-[5vw] m-5' />
        <div className='flex flex-col justify-center'>
          <button onClick={handleScanner} className='flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button'>
            <img src={scanner} className='w-[1vw]' />
            <div className='w-full text-white text-left flex justify-between items-center'>
              <h1 className='text-[0.8vw]'>Point of Sale System</h1>
            </div>
          </button>
          <button onClick={handleTransaction} className='flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button'>
            <img src={transaction} className='w-[1vw]' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[0.8vw]'>Transaction</h1>
            </div>
          </button>
          <button onClick={handleInventory} className='flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button'>
            <img src={inventory} className='w-[1vw]' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[0.8vw]'>Inventory</h1>
            </div>
          </button>
          <button onClick={handleReturn} className='flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button'>
            <img src={returnp} className='w-[1vw]' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[0.8vw]'>Returns</h1>
            </div>
          </button>
          <button onClick={toggleStockInDropdown} className='flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button'>
            <img src={stock} className='w-[1vw]' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[0.8vw]'>Stock In</h1>
              <h1 className={`text-[0.8vw] ${isStockInOpen ? 'rotate-180' : ''}`}>🡫</h1>
            </div>
          </button>
          {isStockInOpen && (
            <div className='flex flex-col bg-black border-b border-white'>
              <button onClick={handleStock} className='text-white flex gap-4 px-6 items-start py-3 border-b border-white hover:bg-darkp2 button'>
                <h1 className='text-[0.8vw]'>Product Stock</h1>
              </button>
              <button onClick={handleSupplier} className='text-white flex gap-4 px-6 items-start py-3 border-b border-white hover:bg-darkp2 button'>
                <h1 className='text-[0.8vw]'>Suppliers</h1>
              </button>
              <button onClick={handleStockRecords} className='text-white flex gap-4 px-6 items-start py-3 border-white hover:bg-darkp2 button'>
                <h1 className='text-[0.8vw]'>Stock Records</h1>
              </button>
            </div>
          )}
          <button onClick={handleReport} className='flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button'>
            <img src={bar} className='w-[1vw]' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[0.8vw]'>Reports</h1>
            </div>
          </button>
          <button onClick={handleLogout} className='flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button'>
            <img src={right} className='w-[1vw]' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[0.8vw]'>Logout</h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
