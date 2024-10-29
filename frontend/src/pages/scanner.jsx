import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/sidebar';
import bg from '../assets/bg.jpg';

const Scanner = () => {

  const [transaction, setTransaction] = useState([]);
  const [transactionItems, setTransactionItems] = useState([]);
  const [transactionItem, setTransactionItem] = useState({
    id: '',
    supplierId: 1,
    trackingNumber: '', 
    deliveryFee: 0,
    totalAmount: 0,
    status: 'TO ARRIVE',
  });

  const [showProductList, setShowProductList] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleNumberClick = (number) => {
    setQuantity(prev => (parseInt(prev + number) > 0 ? prev + number : ''));
  };

  const handleClear = () => {

  };

  const handleSearchProducts = () => {
    setShowProductList(true);
  };

  const handleCloseProductList = () => {
    setShowProductList(false);
  };

  const handlePaymentButtonClick = () => {
    setShowPaymentModal(true);
  };

  const handleCancelPayment = () => {
    setShowPaymentModal(false);
  };

  return (
    <div className='w-screen h-full bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='flex flex-col w-[83.5vw] h-screen'>
        <div className='w-full h-[10%] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl z-10'>
          <h1 className='text-2xl text-darkp font-medium tracking-tighter'>Point of Sale System</h1>
        </div>
        <div className='w-full h-[5%]'/>
        <div className='w-full h-[85%] flex'>
          <div className='flex flex-col w-[65%] h-full items-center'>
            <div className='flex w-full h-[32vw] justify-center items-center'>
              <div className='w-[90%] h-full bg-white rounded-2xl drop-shadow-xl'>
                <div className='flex gap-[3vw] justify-between items-center text-white text-sm h-[4vw] w-full px-10 py-6 bg-darkp opacity-80 rounded-t-2xl'>
                  <h1 className='w-[16%] text-center'>Quantity</h1>
                  <h1 className='w-[16%] text-center'>UoM</h1>
                  <h1 className='w-[16%] text-center'>Product</h1>
                  <h1 className='w-[16%] text-center'>Unit Price</h1>
                  <h1 className='w-[16%] text-center'>Amount</h1>
                  <h1 className='w-[16%] text-center'>Actions</h1>
                </div>
                <div className='overflow-y-auto'>
                  <div className='flex gap-8 justify-between px-10 py-3 border-b border-gray-200'>
                    <h1 className='w-[16%] text-center'>Quantity</h1>
                    <h1 className='w-[16%] text-center'>UoM</h1>
                    <h1 className='w-[16%] text-center'>Product</h1>
                    <h1 className='w-[16%] text-center'>Unit Price</h1>
                    <h1 className='w-[16%] text-center'>Amount</h1>
                    <h1 className='w-[16%] text-center'>Actions</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full h-[2vw]'/>
            <div className='w-[90%] bg-darkp opacity-80 h-1/6 rounded-2xl px-10 flex flex-col justify-center gap-1 text-white drop-shadow-xl'>
              <div className='w-full flex justify-between'>
                <h1>Cost before discount:</h1>
                <h1>₱ RAWR</h1>
              </div>
              <div className='w-full flex justify-between'>
                <h1 className='text-2xl'>Total Amount:</h1>
                <h1 className='text-2xl'>₱ rawr</h1>
              </div>
            </div>
          </div>
          <div className='w-[32%] h-full'>
            <div className='h-[7vw] w-full bg-white drop-shadow-xl rounded-2xl'>
              <div className='w-full h-[3vw] py-6 text-sm text-white bg-darkp flex opacity-80 items-center px-5 rounded-t-2xl'>
                Quantity:
              </div>
              <input
                type='number'
                min='1'
                className='h-4/6 w-full px-5 text-4xl text-darkp font-bold border-none outline-none rounded-b-2xl'
                placeholder='enter quantity'
              />
            </div>
            <div className='flex gap-2 w-full h-2/5 justify-between mt-[2vw]'>
              <div className='flex flex-col gap-2 justify-between w-full'>
                <button onClick={() => handleNumberClick('7')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>7</button>
                <button onClick={() => handleNumberClick('4')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>4</button>
                <button onClick={() => handleNumberClick('1')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>1</button>
              </div>
              <div className='flex flex-col gap-2 justify-between w-full'>
                <button onClick={() => handleNumberClick('8')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>8</button>
                <button onClick={() => handleNumberClick('5')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>5</button>
                <button onClick={() => handleNumberClick('2')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>2</button>
              </div>
              <div className='flex flex-col gap-2 justify-between w-full'>
                <button onClick={() => handleNumberClick('9')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>9</button>
                <button onClick={() => handleNumberClick('6')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>6</button>
                <button onClick={() => handleNumberClick('3')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>3</button>
              </div>
              <div className='flex flex-col gap-2 justify-between w-full'>
                <button onClick={handleClear} className='h-full rounded-2xl bg-white drop-shadow-xl text-md hover:bg-red-400 hover:text-white button'>CLEAR</button>
                <button onClick={() => handleNumberClick('0')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>0</button>
              </div>
            </div>
            <div className='flex w-full'>
              <input type='text' placeholder='barcode' className='w-full text-[1vw] outline-none py-5 border mt-8 rounded-l-lg shadow-2xl px-5'/>
              <button className='mt-8 py-4 px-8 bg-darkp text-white text-[0.9vw] font-medium bg-opacity-80 rounded-r-lg shadow-2xl leading-5'>Add Product</button>
            </div>
            <div className='flex mt-6 justify-between'>
              <button
                onClick={handleSearchProducts}
                className='w-[33%] h-[3.5vw] bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'
              >
                <h1 className='text-[0.9vw] font-medium p-[8%]'>Search P.</h1>
              </button>
              <button className='w-[33%] h-[3.5vw] bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'>
                <h1 className='text-[0.9vw] font-medium p-[8%]'>Discount</h1>
              </button>
              <button 
                onClick={handlePaymentButtonClick}
                className='w-[33%] h-[3.5vw] bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'>
                <h1 className='text-[0.9vw] font-medium p-[8%]'>Payment</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showProductList && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20'>
          <div className='bg-white w-8/12 h-3/4 rounded-2xl drop-shadow-xl flex flex-col'>
            <div className='flex justify-between items-center py-6 pl-10 pr-14 bg-white text-black rounded-t-2xl w-full'>
              <h1 className='text-xl font-medium'>Products List</h1>
              <input
                type="text"
                className='px-4 py-2 text-darkp text-md font-light outline-none w-4/12 rounded-full border border-darkp placeholder:text-darkp2'
                placeholder="search for products"
              />
              <div className='flex gap-3'>
                <button
                  className='text-darkp border border-darkp rounded-lg px-4 py-2 hover:bg-darkp hover:text-white button'
                >
                  Add
                </button>
                <button onClick={handleCloseProductList} className='text-darkp border border-darkp rounded-lg px-4 py-2 hover:bg-darkp hover:text-white button'>
                  Close
                </button>
              </div>
            </div>
            <div className='overflow-y-scroll px-10 mb-10'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='bg-darkp text-white sticky top-0'>
                    <th className='py-2 px-4'>Item Code</th>
                    <th className='py-2 px-4'>Product Name</th>
                    <th className='py-2 px-4'>Supplier</th>
                    <th className='py-2 px-4'>Wholesale Price</th>
                    <th className='py-2 px-4'>Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showPaymentModal && (
        <div className='fixed inset-0 w-full right-0 flex items-end justify-end'>
          <div className='bg-cover bg-center h-full w-full flex justify-end' style={{ backgroundImage: `url(${bg})` }}>
            <div className='w-10/12 px-10 py-24 flex flex-col gap-10 mt-4'>
              <h2 className='text-5xl text-left text-white bg-darkp opacity-80 rounded-2xl px-5 py-5 font-semibold tracking-tighter'>Payment Confirmation</h2>
              <div className='h-3/6 flex gap-5 items-start justify-center'>
                <div className='h-full flex flex-col gap-3'>
                  <div className='w-full h-full flex flex-col gap-5 justify-start items-start bg-white border-2 rounded-2xl opacity-70 px-10 py-5'>
                    <p className='text-3xl font-semibold tracking-tight'>Total Amount:</p>
                    <p className='text-6xl font-semibold tracking-tighter'>₱ rawr</p>
                  </div>
                  <div className='w-full flex flex-col gap-2 justify-start items-start bg-white border-2 rounded-2xl px-10 py-5'>
                    <p className='text-3xl font-semibold tracking-tight'>Amount Paid:</p>
                    <div className='flex gap-2 text-6xl font-semibold items-center justify-start'>
                      <p>₱</p>
                      <input
                        type='number'
                        className='w-full text-6xl leading-5 outline-none bg-transparent tracking-tight placeholder:tracking-tighter'
                        placeholder='enter amount'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-20 h-full w-full bg-white border-2 rounded-2xl px-10 py-5'>
                  <p className='text-3xl font-semibold tracking-tight'>Change:</p>
                  <p className='text-9xl font-semibold tracking-tighter'> ₱ rawr</p>
                </div>
              </div>
              <div className='flex gap-5 justify-end'>
                <button
                  className='bg-darkp opacity-80 hover:opacity-100 button text-white text-lg tracking-tight px-4 py-2 rounded'
                >
                  Proceed with Payment
                </button>
                <button
                  onClick={handleCancelPayment}
                  className='bg-darkp opacity-80 hover:opacity-100 button text-white text-lg tracking-tight px-4 py-2 rounded'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;