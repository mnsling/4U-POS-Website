import React, { useState } from 'react'
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'
import info from '../assets/info.png'
import exit from '../assets/reject.png'
import edit from '../assets/edit.png'
import del from '../assets/delete.png'
import right from '../assets/right-chevron.png'

const Transaction = () => {

  const [showDetailsPrompt, setShowDetailsPrompt] = useState(false);
  const [showFormPrompt, setShowFormPrompt] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [showEdit2Prompt, setShowEdit2Prompt] = useState(false);

  const handleDetailsClick = () => {
    setShowDetailsPrompt(true);
  };

  const handleFormClick = () => {
    setShowFormPrompt(true);
  };

  const handleAddClick = () => {
    setShowAddPrompt(true);
  };

  const handleCloseAddPrompt = () => {
    setShowAddPrompt(false);
  };

  const handleEdit2Click = () => {
    setShowEdit2Prompt(true);
  };

  const handleCloseEdit2Prompt = () => {
    setShowEdit2Prompt(false);
  };

  const handleClosePrompt = () => {
    setShowDetailsPrompt(false);
    setShowFormPrompt(false);
  };

  const [activeButton, setActiveButton] = useState('DRAFT'); // Set the initial active button

  const handleButtonClick = (status) => {
    setActiveButton(status); // Update the active button state
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Transactions</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-between'>
            <div className='w-[15.5vw] flex justify-between gap-5'>
              <select className='py-2 px-4 w-[8vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                <option>Select Terminal</option>
                <option>All</option>
                <option>Terminal 1</option>
                <option>Terminal 2</option>
                <option>Terminal 3</option>
              </select>
              <input type='datetime-local' className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button' />
            </div>
          </div>
          <div className='w-full h-[63vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Time</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Date</h1>
              <h1 className='w-[8vw] text-[0.7vw] text-center'>Terminal #</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Sales Invoice</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Amount</h1>
              <h1 className='w-[8vw] text-[0.7vw] text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              <div className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>11:30 AM</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>03/20/24</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>1</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>2024220</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>30.00</h1>
                <div className='w-[8vw] flex justify-center gap-5'>
                  <img
                    src={info}
                    alt='edit'
                    className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                    onClick={handleDetailsClick}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-[12vh] rounded-2xl flex flex-col drop-shadow bg-darkp opacity-80'>
            <div className='w-full h-full flex px-10 justify-between items-center text-white font-bold tracking-tighter'>
              <h1 className='text-2xl'>Total Amount:</h1>
              <h1 className='text-2xl'>P30.00</h1>
            </div>
          </div>
          {/* Prompt (Modal) */}
          {showDetailsPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex'>
              <div className='bg-white w-full h-full p-[2vw] flex flex-col items-start gap-5'>
                <div className='w-full flex items-center'>
                  <div className='w-full flex justify-start'>
                    <div className='text-darkp w-full flex flex-col gap-5'>
                      <div className='flex gap-10 items-end'>
                        <h1 className='text-[3vw] font-bold tracking-tighter'>INVOICE #2024220</h1>
                      </div>
                      <div className='w-full flex gap-10'>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Terminal #:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>1</h1>
                          </div>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Cashier Name:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>Will Smith</h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Date:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>03/20/24</h1>
                          </div>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Time:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>11:30 AM</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleClosePrompt} className='h-full pt-5 flex items-start'><img src={exit} className='w-[1.8vw] h-[1.8vw]' /></button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <div className='w-full flex justify-between items-end'>
                    <h1 className='text-[1vw] text-darkp font-bold tracking-tighter'>Items Ordered:</h1>
                  </div>
                  <div className='w-full h-[50vh] flex flex-col drop-shadow'>
                    <div className='h-[6vh] bg-darkp opacity-80 border border-darkp rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Quantity</h1>
                      <h1 className='w-[8vw] text-[0.7vw] text-center'>Unit of Measurement</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Description</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Unit Price</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Discount</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Amount</h1>
                    </div>
                    <div className='w-full h-full bg-white border-x rounded-b-2xl border-b border-darkp overflow-auto'>
                      <div className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>4</h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>PCS</h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>Ballpen</h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>10.00</h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>0%</h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>30.00</h1>
                      </div>
                    </div>
                  </div>
                  <div className='w-full h-[12vh] rounded-2xl flex flex-col drop-shadow bg-darkp opacity-80'>
                    <div className='w-full h-full flex px-10 justify-between items-center text-white font-bold tracking-tighter'>
                      <h1 className='text-2xl'>Total Amount:</h1>
                      <h1 className='text-2xl'>P30.00</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Transaction
