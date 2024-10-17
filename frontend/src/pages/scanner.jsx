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
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Point of Sale System</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full h-[63vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Quantity</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Unit of Measurement</h1>
              <h1 className='w-[8vw] text-[0.7vw] text-center'>Product Name</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Unit Price</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Amount</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              <div className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10 hover:bg-gray-200 button'>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>5</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>PCS</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>Chips</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>10.00</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>50.00</h1>
              </div>
            </div>
          </div>
          <div className='w-full h-[12vh] rounded-2xl flex flex-col drop-shadow bg-darkp opacity-80'>
            <div className='w-full h-full flex px-10 justify-between items-center text-white font-bold tracking-tighter'>
              <h1 className='text-[2vw]'>Total Amount:</h1>
              <h1 className='text-[2vw]'>P50.00</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction
