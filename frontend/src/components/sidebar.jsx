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
    <div className='w-[20%] h-screen font-poppins bg-darkp relative z-20'>
      <div className='w-full h-full absolute opacity-30 bg-cover' style={{ backgroundImage: `url(${logo})` }} />
      <div className='w-full h-full flex flex-col gap-[10vh] relative p-[5%] pt-[10%]'>
        <img src={logo} className='w-[5vw] pl-[6%]'/>
        <div className='flex flex-col gap-[1vw] justify-center'>
          <button onClick={handleScanner} className='w-[95%] flex gap-[1.5vh] items-center justify-center px-[10%] py-[4%] rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={scanner} className='w-[1.5vw]'/>
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[1vw]'>Point of Sale System</h1>
            </div>
          </button>
          <button onClick={handleTransaction} className='w-[95%] flex gap-[1vh] items-center px-[10%] py-[4%] rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={transaction} className='w-[1.5vw]' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[1vw]'>Transaction</h1>
            </div>
          </button>
          <button onClick={handleInventory} className='w-[95%] flex gap-[1vh] items-center px-[10%] py-[4%] rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={inventory} className='w-[1.5vw]' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[1vw]'>Inventory</h1>
            </div>
          </button>
          <button onClick={handleReturn} className='w-[95%] flex gap-[1vh] items-center px-[10%] py-[4%] rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={returnp} className='w-[1.5vw]' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[1vw]'>Returns</h1>
            </div>
          </button>
          <button onClick={handleStock} className='w-[95%] flex gap-[1vh] items-center px-[10%] py-[4%] rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={stock} className='w-[1.5vw]' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[1vw]'>Stock In</h1>
            </div>
          </button>
          <button onClick={handleReport} className='w-[95%] flex gap-[1vh] items-center px-[10%] py-[4%] rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={bar} className='w-[1.5vw]' />
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[1vw]'>Reports</h1>
            </div>
          </button>
          <button onClick={handleLogout} className='w-[95%] flex gap-[1vh] items-center px-6 py-4 rounded-full border border-transparent hover:bg-darkp2 hover:border-white button'>
            <img src={right} className='w-[1.5vw]'/>
            <div className='w-full text-white flex justify-between items-center'>
              <h1 className='text-[1vw]'>Logout</h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
