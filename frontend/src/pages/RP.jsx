import React, { useState, useEffect } from 'react';
import bg from '../assets/bg.jpg';
import Sidebar from '../components/sidebar';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
import info from '../assets/info.png';
import exit from '../assets/reject.png';
import move from '../assets/loop.png';
import open from '../assets/unboxing.png';
import out from '../assets/not-available.png'
// import axios from 'axios';

const rp = () => {

  const [showEditPrompt, setShowEditPrompt] = useState(false);
  const [showFormPrompt, setShowFormPrompt] = useState(false);
  const [showDetailsPrompt, setShowDetailsPrompt] = useState(false);
  const [showOpenBoxPrompt, setShowOpenBoxPrompt] = useState(false);
  const [showMovePrompt, setShowMovePrompt] = useState(false);
  const [showOutPrompt, setShowOutPrompt] = useState(false);


  const handleEditClick = () => {
    setShowEditPrompt(true);
  };

  const handleEditClosePrompt = () => {
    setShowEditPrompt(false);
  };

  const handleFormClick = () => {
    setShowFormPrompt(true);
  };

  const handleFormClosePrompt = () => {
    setShowFormPrompt(false);
  };

  const handleDetailsClick = () => {
    setShowDetailsPrompt(true);
  };

  const handleDetailsClosePrompt = () => {
    setShowDetailsPrompt(false);
  };

  const handleOpenBoxClick = () => {
    setShowOpenBoxPrompt(true);
  };

  const handleOpenBoxClosePrompt = () => {
    setShowOpenBoxPrompt(false);
  };

  const handleMoveClick = () => {
    setShowMovePrompt(true);
  };

  const handleMoveClosePrompt = () => {
    setShowMovePrompt(false);
  };

  const handleOutClick = () => {
    setShowOutPrompt(true);
  };

  const handleOutClosePrompt = () => {
    setShowOutPrompt(false);
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>RP Stock</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-between'>
            <div className='w-[15.5vw] flex justify-between'>
              <button onClick={handleFormClick} className='px-[1vw] py-[0.8vh] text-[0.8vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Add New Product Stock</button>
            </div>
            <input
              type="text"
              className='bg-white px-[1vw] py-[0.8vh] text-darkp text-[0.8vw] font-light outline-none w-4/12 rounded-xl border border-darkp placeholder:text-darkp2'
              placeholder="search for supplier"
            />
          </div>
          {/*Gidungag nlng pod nako sa table ang backhouse of display uom*/}
          <div className='w-full h-[72vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Product ID</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Backhouse Stock</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Backhouse UoM</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Display UoM</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              <div className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>001</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>100</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>Case</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>Pcs</h1>
                <div className='w-[8vw] flex justify-center gap-5'>
                  <img
                    src={info}
                    alt='delete'
                    className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                    onClick={handleDetailsClick}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Prompt (Modal) */}
          {showFormPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[50vw] h-[40vh] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Add Product Stock</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Stock Name</label>
                      <input type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter name' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Backhouse UoM</label>
                      <input type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter uom' />
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Display UoM</label>
                      <input type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter uom' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-10'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-green-500 button'
                    onClick={handleFormClosePrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-red-500 button'
                    onClick={handleFormClosePrompt}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {showDetailsPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex'>
              <div className='bg-white w-full h-full p-[2vw] flex flex-col items-start gap-5'>
                <div className='w-full flex items-center'>
                  <div className='w-full flex justify-start'>
                    <div className='text-darkp w-full flex flex-col gap-5'>
                      <div className='flex gap-10 items-end'>
                        <h1 className='text-[3vw] font-bold tracking-tighter'>STOCK RECORD #1</h1>
                        <div className='flex gap-3 h-fit justify-end items-end pb-5'>
                          <button onClick={handleEditClick} className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Edit</button>
                          <button className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Delete</button>
                        </div>
                      </div>
                      <div className='w-full flex gap-10'>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Product ID:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>001</h1>
                          </div>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Backhouse Stock:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>200</h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Backhouse UoM:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>Case</h1>
                          </div>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Display UoM:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>Pcs</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleDetailsClosePrompt} className='h-full pt-5 flex items-start'><img src={exit} className='w-[1.8vw] h-[1.8vw]' /></button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <div className='w-full flex justify-between items-end'>
                    <h1 className='text-[1vw] text-darkp font-bold tracking-tighter'>Items Ordered:</h1>
                  </div>
                  <div className='w-full h-[64vh] flex flex-col drop-shadow'>
                    <div className='h-[6vh] bg-darkp opacity-80 border border-darkp rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Reference #</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Product</h1>
                      <h1 className='w-[8vw] text-[0.7vw] text-center'>Closed Stock</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Open Stock</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>To Repack</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Displayed</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Damaged</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Stocked Out</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Expiry Date</h1>
                    </div>
                    <div className='w-full h-full bg-white border-x rounded-b-2xl border-b border-darkp overflow-auto'>
                      <div className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>001230213</h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'></h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'></h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'></h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'></h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'></h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'></h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>20</h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>06/05/2024</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showOpenBoxPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[20vw] h-[40vh] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Open Box</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>To Display Qty</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Damaged Qty</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-10'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-green-500 button'
                    onClick={handleOpenBoxClosePrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-red-500 button'
                    onClick={handleOpenBoxClosePrompt}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {showMovePrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[20vw] h-[30vh] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Move Stock</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Display Qty</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-10'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-green-500 button'
                    onClick={handleMoveClosePrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-red-500 button'
                    onClick={handleMoveClosePrompt}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {showOutPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[30vw] h-[50vh] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Stocked Out</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Quantity</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Description</label>
                      <textarea
                        className='w-full h-[15vh] border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw] resize-none'
                        placeholder='Enter description here'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-10'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-green-500 button'
                    onClick={handleOutClosePrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-red-500 button'
                    onClick={handleOutClosePrompt}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {showEditPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[30vw] h-[40vh] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Product ID #001</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Backhouse UoM</label>
                      <input type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter uom' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Display UoM</label>
                      <input type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter uom' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-10'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-green-500 button'
                    onClick={handleEditClosePrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-red-500 button'
                    onClick={handleEditClosePrompt}
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

export default rp;
