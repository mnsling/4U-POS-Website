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
import sup from '../assets/parcel.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null); // Tracks the open dropdown
  const userRole = localStorage.getItem('userRole');

  const handleNavigation = (route) => {
    navigate(route);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  return (
    <div className="w-[16.67vw] h-screen font-poppins bg-darkp relative z-20">
      <div className="w-full h-full flex flex-col gap-20 z-20 relative">
        <img src={logo} className="w-[5vw] m-5" />
        <div className="flex flex-col justify-center">
        {(userRole === 'cashier' || userRole === 'admin') && (
                    <button onClick={() => handleNavigation('/scanner')} className="flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button">
                        <img src={scanner} className="w-[1vw]" alt="Scanner" />
                        <h1 className="text-[0.8vw] text-white">Point of Sale System</h1>
                    </button>
                )}
          {(userRole === 'cashier' || userRole === 'admin') && (
                    <button onClick={() => handleNavigation('/transaction')} className="flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button">
                        <img src={transaction} className="w-[1vw]" alt="Transaction" />
                        <h1 className="text-[0.8vw] text-white">Transaction</h1>
                    </button>
                )}
          {(userRole === 'cashier' || userRole === 'admin') && (
                    <button onClick={() => handleNavigation('/return')} className="flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button">
                        <img src={returnp} className="w-[1vw]" alt="Returns" />
                        <h1 className="text-[0.8vw] text-white">Returns</h1>
                    </button>
                )}
          {userRole === 'admin' && (
                    <>
                        <button onClick={() => handleNavigation('/inventory')} className="flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button">
                            <img src={inventory} className="w-[1vw]" alt="Inventory" />
                            <h1 className="text-[0.8vw] text-white">Inventory</h1>
                        </button>
                        {/* Add other admin-specific buttons here */}
                    </>
                )}
          {userRole === 'admin' && (
                    <button
                      onClick={() => handleNavigation('/records')}
                      className="flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button"
                    >
                      <img src={inventory} className="w-[1vw]" />
                      <div className="w-full text-white flex justify-between items-center">
                        <h1 className="text-[0.8vw]">Delivery Records</h1>
                      </div>
                    </button>
                    
          )}
          
                {/* Stock Management Dropdown */}
            {userRole === 'admin' && (
                    <button
                      onClick={() => toggleDropdown('stockIn')}
                      className="flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button"
                    >
                      <img src={stock} className="w-[1vw]" />
                      <div className="w-full text-white flex justify-between items-center">
                        <h1 className="text-[0.8vw]">Stock Management</h1>
                        <h1 className={`text-[0.8vw] ${activeDropdown === 'stockIn' ? 'rotate-180' : ''}`}>🡫</h1>
                      </div>
                    </button>
            )}
                    {activeDropdown === 'stockIn' && (
                      <div className="flex flex-col bg-black border-b border-white">
                        <button
                          onClick={() => handleNavigation('/stock')}
                          className="text-white flex gap-4 px-6 items-start py-3 border-b border-white hover:bg-darkp2 button"
                        >
                          <h1 className="text-[0.8vw]">Product Stock</h1>
                        </button>
                        <button
                          onClick={() => handleNavigation('/open')}
                          className="text-white flex gap-4 px-6 items-start py-3 border-b border-white hover:bg-darkp2 button"
                        >
                          <h1 className="text-[0.8vw]">Open Stocks</h1>
                        </button>
                        <button
                          onClick={() => handleNavigation('/move')}
                          className="text-white flex gap-4 px-6 items-start py-3 border-b border-white hover:bg-darkp2 button"
                        >
                          <h1 className="text-[0.8vw]">Move Stocks</h1>
                        </button>
                        <button
                          onClick={() => handleNavigation('/out')}
                          className="text-white flex gap-4 px-6 items-start py-3 hover:bg-darkp2 button"
                        >
                          <h1 className="text-[0.8vw]">Stock Out</h1>
                        </button>
                      </div>
                    )}
                {/* Repacked Stocks Dropdown */}
            {userRole === 'admin' && (
                <button
                  onClick={() => toggleDropdown('repack')}
                  className="flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button"
                >
                  <img src={stock} className="w-[1vw]" />
                  <div className="w-full text-white flex justify-between items-center">
                    <h1 className="text-[0.8vw]">Repacked Products</h1>
                    <h1 className={`text-[0.8vw] ${activeDropdown === 'repack' ? 'rotate-180' : ''}`}>🡫</h1>
                  </div>
                </button>
            )}
                {activeDropdown === 'repack' && (
                  <div className="flex flex-col bg-black border-b border-white">
                    <button
                      onClick={() => handleNavigation('/sinventory')}
                      className="text-white flex gap-4 px-6 items-start py-3 border-b border-white hover:bg-darkp2 button"
                    >
                      <h1 className="text-[0.8vw]">Repacked Products Inventory</h1>
                    </button>
                    <button
                      onClick={() => handleNavigation('/rp')}
                      className="text-white flex gap-4 px-6 items-start py-3 border-b border-white hover:bg-darkp2 button"
                    >
                      <h1 className="text-[0.8vw]">Repacked Products Stocks</h1>
                    </button>
                    <button
                      onClick={() => handleNavigation('/repack')}
                      className="text-white flex gap-4 px-6 items-start py-3 border-b border-white hover:bg-darkp2 button"
                    >
                      <h1 className="text-[0.8vw]">Repack Stocks</h1>
                    </button>
                    <button
                      onClick={() => handleNavigation('/out')}
                      className="text-white flex gap-4 px-6 items-start py-3 hover:bg-darkp2 button"
                    >
                      <h1 className="text-[0.8vw]">Stock Out</h1>
                    </button>
                  </div>
                )}
            {userRole === 'admin' && (
                <button
                  onClick={() => handleNavigation('/suppliers')}
                  className="flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button"
                >
                  <img src={sup} className="w-[1vw]" />
                  <div className="w-full text-white flex justify-between items-center">
                    <h1 className="text-[0.8vw]">Suppliers</h1>
                  </div>
                </button>
            )}
            {userRole === 'admin' && (
                <button
                  onClick={() => handleNavigation('/report')}
                  className="flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button"
                >
                  <img src={bar} className="w-[1vw]" />
                  <div className="w-full text-white flex justify-between items-center">
                    <h1 className="text-[0.8vw]">Reports</h1>
                  </div>
                </button>
            )}
          {/* Logout button: Visible to all roles */}
          <button onClick={() => handleNavigation('/')} className="flex gap-4 items-center px-6 py-3 border-b border-white hover:bg-darkp2 button">
                    <img src={right} className="w-[1vw]" alt="Logout" />
                    <h1 className="text-[0.8vw] text-white">Logout</h1>
                </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;