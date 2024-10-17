import React, { useState, useEffect } from 'react';
import bg from '../assets/bg.jpg';
import Sidebar from '../components/sidebar';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
// import axios from 'axios';

const Returns = () => {

  const [showConfirmButton, setShowConfirmButton] = useState(true);

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Returns</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-start mt-10'>
          <div className='w-[30vw] flex justify-start'>
            <input type='date' className='py-2 px-4 w-[8vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button' />
          </div>
          <div className='w-full h-[52vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Return ID</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Return Date</h1>
              <h1 className='w-[8vw] text-[0.7vw] text-center'>Invoice #</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Refund Status</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Refund Amount</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              <div className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>

                {/*replace the value for suppliers */}

                <h1 className='w-[8vw] text-[0.7vw] text-center'>0123456</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>06/04/24</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>111111</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>Accepted</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>200.00</h1>
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
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-[22vh] bg-darkp opacity-80 flex items-center justify-center rounded-2xl px-[1vw] py-[1vh] drop-shadow'>
            <div className='h-fit flex gap-5 justify-between'>
              <div className='w-[25vw] flex flex-col gap-5'>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Return ID</label>
                  <select className='bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg'>
                    <option></option>
                  </select>
                </div>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Return Date</label>
                  <input
                    type="date"
                    name="returnDate"
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter cellphone no.*"
                  />
                </div>
              </div>
              <div className='w-[25vw] flex flex-col gap-5'>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Invoice #</label>
                  <select className='bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg'>
                    <option></option>
                  </select>
                </div>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Refund Status</label>
                  <select className='bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg'>
                    <option></option>
                    <option>Requested</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Declined</option>
                    <option>Completed</option>
                    <option>Failed</option>
                  </select>
                </div>
              </div>
              <div className='w-[25vw] flex flex-col justify-between'>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Refund Amount</label>
                  <input
                    type="number"
                    name="refundAmount"
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter amount*"
                  />
                </div>
                <div className='w-full flex items-end justify-end'>
                  {showConfirmButton ? (
                    <button
                      className='w-[48%] px-[1vw] py-[1vh] bg-white text-[0.7vw] border border-black rounded-xl text-black hover:bg-green-500 hover:border-white hover:text-white button'
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
  );
};

export default Returns;