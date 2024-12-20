import React, { useState } from 'react'
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'
import info from '../assets/info.png'
import exit from '../assets/reject.png'
import edit from '../assets/edit.png'
import del from '../assets/delete.png'
import right from '../assets/right-chevron.png'

const Records = () => {

  const [showDetailsPrompt, setShowDetailsPrompt] = useState(false);
  const [showFormPrompt, setShowFormPrompt] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [showEdit2Prompt, setShowEdit2Prompt] = useState(false);
  const [showEdit3Prompt, setShowEdit3Prompt] = useState(false);

  const handleDetailsClick = () => {
    setShowDetailsPrompt(true);
  };

  const handleFormClick = () => {
    setShowFormPrompt(true);
  };

  const handleAddClick = () => {
    setShowAddPrompt(true);
  };

  const handleEdit3Click = () => {
    setShowEdit3Prompt(true);
  };

  const handleCloseEdit3Prompt = () => {
    setShowEdit3Prompt(false);
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
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Stock Records</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-between'>
            <div className='w-[15.5vw] flex justify-between gap-5'>
              <select className='py-2 px-4 w-[8vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                <option>Select Supplier</option>
              </select>
              <input type='date' className='py-2 px-4 w-[8vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button' />
            </div>
            <button onClick={handleFormClick} className='bg-white px-4 py-2 text-darkp font-light text-[0.6vw] outline-none w-[10vw] rounded-xl border border-darkp hover:bg-darkp hover:text-white button'>Create New Stock Record</button>
          </div>
          <div className='w-full h-[75vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Stock Record #</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Tracking #</h1>
              <h1 className='w-[8vw] text-[0.7vw] text-center'>Supplier Name</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Order Date</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Status</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Delivery Fee</h1>
              <h1 className='w-[8vw] text-[0.7vw] text-center'>Total Amount</h1>
              <h1 className='w-[8vw] text-[0.7vw] text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              <div className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>1</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>1</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>Greenleaf Supply Co.</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>01/01/2024</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>Delivered</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>270.00</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>1000.00</h1>
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
          {/* Prompt (Modal) pang add lng sa stock records na wa details sa sulod*/}
          {showFormPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[50vw] h-[40vh] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Add Stock Record</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Supplier</label>
                      <input type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter supplier' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Tracking #</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter tracking #' />
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Delivery Fee</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter fee amount' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Status</label>
                      <select className='w-full border border-darkp rounded-md px-5 py-2'>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>In Transit</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                        <option>Backorder</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-10'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-green-500 button'
                    onClick={handleClosePrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-red-500 button'
                    onClick={handleClosePrompt}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Prompt (Modal) kini kay mao na ni tong mga specific details sa records mismo */}
          {showDetailsPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex'>
              <div className='bg-white w-full h-full p-[2vw] flex flex-col items-start gap-5'>
                <div className='w-full flex items-center'>
                  <div className='w-full flex justify-start'>
                    <div className='text-darkp w-full flex flex-col gap-5'>
                      <div className='flex gap-10 items-end'>
                        <h1 className='text-[3vw] font-bold tracking-tighter'>STOCK RECORD #1</h1>
                        <div className='flex gap-3 h-fit justify-end items-end pb-5'>
                          <button className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button' onClick={handleEdit2Click}>Edit</button>
                          <button className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Delete</button>
                        </div>
                      </div>
                      <div className='w-full flex gap-10'>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Tracking #:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>1</h1>
                          </div>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Supplier Name:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>Greenleaf Supply Co.</h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Order Date:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>01/01/2024</h1>
                          </div>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Date Delivered:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>N/A</h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Delivery Fee:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>270.00</h1>
                          </div>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Total Amount:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>1000.00</h1>
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
                    <button onClick={handleAddClick} className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Add Item</button>
                  </div>
                  <div className='w-full h-[50vh] flex flex-col drop-shadow'>
                    <div className='h-[6vh] bg-darkp opacity-80 border border-darkp rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Product</h1>
                      <h1 className='w-[8vw] text-[0.7vw] text-center'>Price</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Quantity Ordered</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Quantity Delivered</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Total</h1>
                      <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Actions</h1>
                    </div>
                    <div className='w-full h-full bg-white border-x rounded-b-2xl border-b border-darkp overflow-auto'>
                      <div className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>Ice Candy</h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>5.00</h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>200</h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>200</h1>
                        <h1 className='w-[8vw] text-[0.7vw] text-center'>1000.00</h1>
                        <div className='w-[8%] flex justify-center gap-5'>
                          <img
                            src={edit}
                            alt='edit'
                            className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                            onClick={handleEdit3Click}
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
                  <div className='mt-3'>
                    <h1 className='text-[1vw] text-darkp font-bold tracking-tighter mb-2'>Status Bar:</h1>
                    <div className='w-[40vw] h-[3.5vw] rounded-2xl border border-darkp flex justify-center gap-2 font-medium tracking-tighter text-[.7vw] text-darkp'>
                      {['DRAFT', 'PENDING', 'IN TRANSIT', 'REJECTED', 'DELIVERED', 'CANCELLED'].map((status, index) => (
                        <div key={index} className='flex gap-2 h-full items-center'>
                          <button
                            onClick={() => handleButtonClick(status)}
                            className={`py-3 px-4 hover:bg-darkp hover:text-white rounded-xl hover:rounded-xl button ${activeButton === status ? 'bg-darkp text-white rounded-xl' : ''
                              }`}
                          >
                            {status}
                          </button>
                          {index < 5 && <img src={right} className='w-[1.2vw]' />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Prompt (Modal) kani sauna pmn ni nmo girequest pero yeah*/}
          {showAddPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[20vw] h-[40vh] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Add Items</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Product</label>
                      <input type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter product' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Quantity Ordered</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-10'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-green-500 button'
                    onClick={handleCloseAddPrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-red-500 button'
                    onClick={handleCloseAddPrompt}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Prompt (Modal) na girequest ni master tung sa tapad sa stock record#1 na edit button */}
          {showEdit2Prompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[50vw] h-[40vh] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Stock Record</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Tracking #</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter tracking #' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Supplier Name</label>
                      <input type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter supplier name' />
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Date Delivered</label>
                      <input type='date' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter date' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Delivery Fee</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter amount' />
                    </div>
                  </div>
                  <div className='w-full flex flex-col justify-start gap-1'>
                    <label className='text-[0.7vw]'>Total Amount</label>
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter amount' />
                  </div>
                </div>
                <div className='flex gap-4 mt-10'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-green-500 button'
                    onClick={handleCloseEdit2Prompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-red-500 button'
                    onClick={handleCloseEdit2Prompt}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Prompt (Modal) na girequest ni master para sa edit item sa sulod sa stock records ngayong oct 17 lang */}
          {showEdit3Prompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[50vw] h-[40vh] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Edit Item</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Product Name</label>
                      <input type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter supplier' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Price</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter tracking #' />
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Quantity Ordered</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter fee amount' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4 mt-10'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-green-500 button'
                    onClick={handleCloseEdit3Prompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-red-500 button'
                    onClick={handleCloseEdit3Prompt}
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
  )
}

export default Records
