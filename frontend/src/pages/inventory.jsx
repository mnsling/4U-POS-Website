import React, { useState, useEffect } from 'react';
import bg from '../assets/bg.jpg';
import Sidebar from '../components/sidebar';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
// import axios from 'axios';

const Inventory = () => {

  const [showConfirmButton, setShowConfirmButton] = useState(true);

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Inventory</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-between'>
            <div className='w-[15.5vw] flex justify-between'>
              <button className='px-[1vw] py-[0.8vh] text-[0.8vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>All</button>
              <button className='px-[1vw] py-[0.8vh] text-[0.8vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>No Stock</button>
              <button className='px-[1vw] py-[0.8vh] text-[0.8vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Low Stock</button>
            </div>
            <input
              type="text"
              className='bg-white px-[1vw] py-[0.8vh] text-darkp text-[0.8vw] font-light outline-none w-4/12 rounded-xl border border-darkp placeholder:text-darkp2'
              placeholder="search for products"
            />
          </div>
          <div className='w-full h-[45vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[6vw] text-[0.7vw] leading-tight text-center'>Barcode #</h1>
              <h1 className='w-[6vw] text-[0.7vw] leading-tight text-center'>Product Name</h1>
              <h1 className='w-[6vw] text-[0.7vw] text-center'>Category</h1>
              <h1 className='w-[6vw] text-[0.7vw] leading-tight text-center'>Backhouse Stock</h1>
              <h1 className='w-[6vw] text-[0.7vw] leading-tight text-center'>Display Stock</h1>
              <h1 className='w-[6vw] text-[0.7vw] leading-tight text-center'>Unit Price</h1>
              <h1 className='w-[6vw] text-[0.7vw] text-center'>WSMQ</h1>
              <h1 className='w-[6vw] text-[0.7vw] text-center'>WSP</h1>
              <h1 className='w-[6vw] text-[0.7vw] text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              <div className='h-[9%] py-6 border-b border-darkp flex items-center justify-between px-10'>
                <h1 className='w-[6vw] text-[0.7vw] text-center'>01223456</h1>
                <h1 className='w-[6vw] text-[0.7vw] text-center'>Milk</h1>
                <h1 className='w-[6vw] text-[0.7vw] text-center'>Beverages</h1>
                <h1 className='w-[6vw] text-[0.7vw] text-center'>100</h1>
                <h1 className='w-[6vw] text-[0.7vw] text-center'>100</h1>
                <h1 className='w-[6vw] text-[0.7vw] text-center'>30.00</h1>
                <h1 className='w-[6vw] text-[0.7vw] text-center'>100.00</h1>
                <h1 className='w-[6vw] text-[0.7vw] text-center'>200.00</h1>
                <div className='w-[6vw] flex justify-center gap-5'>
                  <img
                    src={edit}
                    alt='edit'
                    className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                  />
                  <img
                    src={del}
                    alt='delete'
                    className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-[30vh] bg-darkp opacity-80 flex items-center justify-center rounded-2xl px-[1vw] py-[1vh] drop-shadow'>
            <div className='h-fit flex gap-5 justify-between'>
              <div className='w-[25vw] flex flex-col gap-5'>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Barcode #</label>
                  <input
                    type="number"
                    name="barcodeNo"
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter barcode*"
                  />
                </div>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter product name*"
                  />
                </div>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Category</label>
                  <select
                    name="category"
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                  >
                    <option value=""></option>
                    <option value="MISC">Miscellaneous</option>
                    <option value="STATIONERY">Stationery & Office Supplies</option>
                    <option value="SMOKING">Tobacco & Smoking Accessories</option>
                    <option value="HOUSE">Household Items</option>
                    <option value="HEALTH">Health & Beauty</option>
                    <option value="FROZEN">Frozen Foods</option>
                    <option value="REFRIDGERATED">Dairy & Refrigerated Items</option>
                    <option value="GROCERY">Grocery Items</option>
                    <option value="SNACKS">Snacks</option>
                    <option value="BEVERAGES">Beverages</option>
                  </select>
                </div>
              </div>
              <div className='w-[25vw] flex flex-col gap-5'>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Unit Price</label>
                  <input
                    type="number"
                    name="unitPrice"
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter unit price*"
                  />
                </div>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Wholesale Minimum Quantity (WSMQ)</label>
                  <input
                    type="number"
                    name="wsmq"
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter WSMQ*"
                  />
                </div>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Wholesale Price (WSP)</label>
                  <input
                    type="number"
                    name="wsp"
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter WSP*"
                  />
                </div>
              </div>
              <div className='w-[25vw] flex flex-col justify-between'>
                <div className='flex flex-col gap-[0.3vh] mt-1'>
                  <label className='text-white font-bold text-[0.6vw]'>Reorder Level</label>
                  <input
                    type="number"
                    name="reorderLevel"
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter reorder level*"
                  />
                </div>
                <div className='flex gap-3'>
                  <div className='w-full flex items-end justify-end'>
                    {showConfirmButton ? (
                      <button
                        className='bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg button hover:bg-green-600 hover:text-white'
                      >
                        Confirm
                      </button>
                    ) : (
                      <button
                        className='w-[48%] px-[1vw] py-[1vh] bg-white text-[1vw] border border-black rounded-xl text-black hover:bg-green-500 hover:border-white hover:text-white button'
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
