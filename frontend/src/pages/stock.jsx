import React, { useState, useEffect } from 'react';
import bg from '../assets/bg.jpg';
import Sidebar from '../components/sidebar';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
import convert from '../assets/loop.png'
// import axios from 'axios';

const stock = () => {

  const [showConfirmButton, setShowConfirmButton] = useState(true);

  const [showPrompt, setShowPrompt] = useState(false);

  const handleConvertClick = () => {
    setShowPrompt(true);
  };

  const handleCloseConvertPrompt = () => {
    setShowPrompt(false);
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Product Stock</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-end'>
            <input
              type="text"
              className='bg-white px-[1vw] py-[0.8vh] text-darkp text-[0.8vw] font-light outline-none w-4/12 rounded-xl border border-darkp placeholder:text-darkp2'
              placeholder="search for supplier"
            />
          </div>
          {/*Gidungag nlng pod nako sa table ang backhouse of display uom*/}
          <div className='w-full h-[52vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Product ID</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Backhouse Stock</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Backhouse UoM</h1>
              <h1 className='w-[8vw] text-[0.7vw] text-center'>Display Stock</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Display UoM</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Conversion Rate</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              <div className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>001</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>200</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'></h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>100</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'></h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>50</h1>
                <div className='w-[8vw] flex justify-center gap-5'>
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
                  <img
                    src={convert}
                    alt='delete'
                    className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                    onClick={handleConvertClick}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-[22vh] bg-darkp opacity-80 flex items-center justify-start rounded-2xl px-[1vw] py-[1vh] drop-shadow'>
            <div className='w-full h-fit flex items-end justify-between'>
              <div className='flex w-full gap-10'>
                <div className='flex flex-col justify-center items-center gap-5'>
                  <div className='w-[30vw] flex flex-col gap-[0.5vh]'>
                    <label className='text-white font-bold text-[0.6vw]'>Product Id</label>
                    <input
                      type="text"
                      name="id"
                      className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                      placeholder="enter product id*"
                    />
                  </div>
                  <div className='w-[30vw] flex flex-col gap-[0.5vh]'>
                    <label className='text-white font-bold text-[0.6vw]'>Conversion Rate</label>
                    <input
                      type="number"
                      name="rate"
                      className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                      placeholder="enter conversion rate*"
                    />
                  </div>
                </div>
                {/*Gipadagdag ang backhouse og display na UOM sa form*/}
                <div className='flex flex-col justify-center items-center gap-5'>
                  <div className='w-[30vw] flex flex-col gap-[0.5vh]'>
                    <label className='text-white font-bold text-[0.6vw]'>Backhouse UoM</label>
                    <input
                      type="text"
                      name="backUom"
                      className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                      placeholder="enter UoM*"
                    />
                  </div>
                  <div className='w-[30vw] flex flex-col gap-[0.5vh]'>
                    <label className='text-white font-bold text-[0.6vw]'>Display UoM</label>
                    <input
                      type="text"
                      name="dispUom"
                      className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                      placeholder="enter UoM*"
                    />
                  </div>
                </div>
              </div>
              <div className='w-[10vw] flex flex-col gap-5 justify-end'>
                <div className='w-full flex items-end justify-end'>
                  {showConfirmButton ? (
                    <button
                      className='w-full px-[1vw] py-[1vh] bg-white text-[0.7vw] border border-black rounded-xl text-black hover:bg-green-500 hover:border-white hover:text-white button'
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
          {/* Prompt (Modal) */}
          {showPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[20vw] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1vw] font-black'>Convert to Backhouse Stock</h2>
                {/* Input for adding stock */}
                <div className='w-full flex flex-col gap-2'>
                  <div className='w-full flex flex-col justify-start'>
                    <label className='text-sm'>Product</label>
                    <select className='w-full border border-darkp rounded-md px-5 py-1'>
                      <option>1.</option>
                    </select>
                  </div>
                  <div className='w-full flex flex-col justify-start'>
                    <label className='text-sm'>Quantity</label>
                    <input type='text' className='w-full border border-darkp rounded-md px-5 py-1' />
                  </div>
                </div>
                <div className='flex gap-4'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500 button'
                    onClick={handleCloseConvertPrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-red-500 button'
                    onClick={handleCloseConvertPrompt}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default stock;
