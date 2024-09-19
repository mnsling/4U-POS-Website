import React, { useState } from 'react'
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'
import info from '../assets/info.png'
import exit from '../assets/reject.png'
import edit from '../assets/edit.png'
import del from '../assets/delete.png'

const Records = () => {
  const [form, setForm] = useState({
    barcode: '',
    productName: '',
    category: '',
    unitPrice: '',
    wsmq: '',
    wsp: '',
    reorderLevel: ''
  })

  const [products, setProducts] = useState([])

  const validateForm = () => {
    const errors = {}
    for (const key in form) {
      if (!form[key]) errors[key] = true
    }
    return errors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleAddProduct = () => {
    const errors = validateForm()
    if (Object.keys(errors).length > 0) return

    const newProduct = {
      ...form,
      currentStock: 0
    }

    setProducts([...products, newProduct])

    setForm({
      barcode: '',
      productName: '',
      category: '',
      unitPrice: '',
      wsmq: '',
      wsp: '',
      reorderLevel: ''
    })
  }

  const formatDecimal = (value) => {
    const number = parseFloat(value)
    return isNaN(number) ? '0.00' : number.toFixed(2)
  }

  const [showDetailsPrompt, setShowDetailsPrompt] = useState(false);
  const [showFormPrompt, setShowFormPrompt] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);

  const handleDetailsClick = () => {
    setShowDetailsPrompt(true);
  };

  const handleCloseDetailsPrompt = () => {
    setShowDetailsPrompt(false);
  };

  const handleFormClick = () => {
    setShowFormPrompt(true);
  };

  const handleCloseFormPrompt = () => {
    setShowFormPrompt(false);
  };

  const handleAddClick = () => {
    setShowAddPrompt(true);
  };

  const handleCloseAddPrompt = () => {
    setShowAddPrompt(false);
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
          {/* Prompt (Modal) */}
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
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500 button'
                    onClick={handleCloseFormPrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-red-500 button'
                    onClick={handleCloseFormPrompt}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Prompt (Modal) */}
          {showDetailsPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex'>
              <div className='bg-white w-full h-full p-[2vw] flex flex-col items-start gap-5'>
                <div className='w-full flex items-center'>
                  <div className='w-full flex justify-start'>
                    <div className='text-darkp w-full flex flex-col gap-5'>
                      <div className='flex gap-10 items-end'>
                        <h1 className='text-[3vw] font-bold tracking-tighter'>STOCK RECORD #1</h1>
                        <div className='flex gap-3 h-fit justify-end items-end pb-5'>
                          <button className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Edit</button>
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
                  <button onClick={handleCloseDetailsPrompt} className='h-full pt-5 flex items-start'><img src={exit} className='w-[1.8vw] h-[1.8vw]' /></button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <div className='w-full flex justify-between items-end'>
                    <h1 className='text-[1vw] text-darkp font-bold tracking-tighter'>Items Ordered:</h1>
                    <button onClick={handleAddClick} className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Add Item</button>
                  </div>
                  <div className='w-full h-[65vh] flex flex-col drop-shadow'>
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
                            onClick={() => handleUpdatePass(prod)}
                          />
                          <img
                            src={del}
                            alt='delete'
                            className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                            onClick={() => handleDelete(prod.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Prompt (Modal) */}
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
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500 button'
                    onClick={handleCloseAddPrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-red-500 button'
                    onClick={handleCloseAddPrompt}
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