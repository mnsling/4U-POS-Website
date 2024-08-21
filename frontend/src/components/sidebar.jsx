import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/4Uw.png'
import scanner from '../assets/scan.png'
import transaction from '../assets/transaction.png'
import inventory from '../assets/inventory.png'
import returnp from '../assets/product-return.png'
import stock from '../assets/now-in-stock.png'
import bar from '../assets/bar-chart.png'
import right from '../assets/arrow-right.png'

const Sidebar = () => {
  const navigate = useNavigate();

  const handleScanner = () => {
    navigate('/scanner');
  };

  const handleTransaction = () => {
    navigate('/transaction');
  };

  const handleInventory = () => {
    navigate('/inventory');
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
    navigate('/scanner');
  };

  return (
    <div className='w-2/12 h-screen font-poppins bg-darkp relative z-20'>
      <div className='w-full h-full absolute opacity-30 bg-cover' style={{ backgroundImage: `url(${logo})` }} />
      <div className='w-full h-full p-5 flex flex-col gap-20 z-20 relative'>
        <img src={logo} className='w-5/12' />
        <div className='flex flex-col gap-1 justify-center'>
          <button onClick={handleScanner} className='flex gap-4 items-center px-6 py-4 rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={scanner} className='w-7' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-md'>Point of Sale System</h1>
            </div>
          </button>
          <button onClick={handleTransaction} className='flex gap-4 items-center px-6 py-4 rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={transaction} className='w-8' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-md'>Transaction</h1>
            </div>
          </button>
          <button onClick={handleInventory} className='flex gap-4 items-center px-6 py-4 rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={inventory} className='w-7' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-md'>Inventory</h1>
            </div>
          </button>
          <button onClick={handleReturn} className='flex gap-4 items-center px-6 py-4 rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={returnp} className='w-7' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-md'>Returns</h1>
            </div>
          </button>
          <button onClick={handleStock} className='flex gap-4 items-center px-6 py-4 rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={stock} className='w-7' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-md'>Stock In</h1>
            </div>
          </button>
          <button onClick={handleReport} className='flex gap-4 items-center px-6 py-4 rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={bar} className='w-7' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-md'>Reports</h1>
            </div>
          </button>
          <button onClick={handleLogout} className='flex gap-4 items-center px-6 py-4 rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={right} className='w-7' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-md'>Logout</h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
