import React, { useState } from 'react'
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'
import del from '../assets/delete.png'
import edit from '../assets/edit.png'

const Inventory = () => {

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[80%] h-screen flex flex-col items-center'>
        <div className='w-full h-[10%] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl z-10'>
          <h1 className='text-2xl text-darkp font-medium tracking-tighter'>Inventory</h1>
        </div>
        <div className='h-[90%] w-[95%] flex flex-col items-center'>
          <div className='w-full h-[2vw]'/>
          <div className='w-full flex justify-between'>
            <div className='w-[40%] flex gap-[2%]'>
              <button className='px-[5%] py-[1%] text-[1vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>All</button>
              <button className='px-[5%] py-[1%] text-[1vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>No Stock</button>
              <button className='px-[5%] py-[1%] text-[1vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Low Stock</button>
            </div>
            <input
              type="text"
              className='bg-white px-[2%] text-darkp text-[1vw] font-light outline-none w-4/12 rounded-xl border border-darkp placeholder:text-darkp2'
              placeholder="search for products"
            />
          </div>
          <div className='w-full h-[1vw]'/>
          <div className='w-full h-[50%] rounded-2xl flex flex-col drop-shadow'>
              <div className='h-[12%] bg-darkp opacity-80 rounded-t-2xl text-white text-sm flex justify-between items-center px-10'>
                <h1 className='w-[8%] text-[1vw] leading-tight text-center'>Barcode #</h1>
                <h1 className='w-[8%] text-[1vw] leading-tight text-center'>Product Name</h1>
                <h1 className='w-[8%] text-[1vw] text-center'>Category</h1>
                <h1 className='w-[8%] text-[1vw] leading-tight text-center'>Backhouse Stock</h1>
                <h1 className='w-[8%] text-[1vw] leading-tight text-center'>Display Stock</h1>
                <h1 className='w-[8%] text-[1vw] leading-tight text-center'>Unit Price</h1>
                <h1 className='w-[8%] text-[1vw] text-center'>WSMQ</h1>
                <h1 className='w-[8%] text-[1vw] text-center'>WSP</h1>
                <h1 className='w-[8%] text-[1vw] text-center'>Actions</h1>
              </div>
              <div className='w-full h-[88%] flex flex-col'>
                <div className='w-full h-full bg-white rounded-b-2xl overflow-y-scroll hide-scrollbar'>
                    <div className='w-full text-darkp text-center flex items-center justify-between px-10 py-2 border-b border-gray-200'>
                      <h1 className='w-[8%] text-[1.2vw]'>barcode</h1>
                      <h1 className='w-[8%] text-[1.2vw]'>name</h1>
                      <h1 className='w-[8%] text-[1.2vw]'>category</h1>
                      <h1 className='w-[8%] text-[1.2vw]'>0</h1>
                      <h1 className='w-[8%] text-[1.2vw]'>0</h1>
                      <h1 className='w-[8%] text-[1.2vw]'>00.0000</h1>
                      <h1 className='w-[8%] text-[1.2vw]'>00</h1>
                      <h1 className='w-[8%] text-[1.2vw]'>00.0000</h1>
                      <h1 className='w-[8%] flex gap-[1vw] justify-center'>
                        <button><img src={edit} className='w-[1.5vw]'/></button>
                        <button><img src={del} className='w-[1.5vw]'/></button>
                      </h1>
                    </div>
                </div>
              </div>
          </div>
          <div className='w-full h-[1vw]'/>
          <div className='w-full h-[34%] bg-darkp opacity-80 rounded-2xl px-[3vh] py-[1vw] drop-shadow'>
              <div className='flex justify-between'>
                <div className='w-[32%] flex flex-col justify-between'>
                  <div className='flex flex-col gap-[0.3vh]'>
                    <label className='text-white font-bold text-[1vw]'>Barcode #</label>
                    <input
                      type="text"
                      name="barcode"
                      className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                      placeholder="enter barcode (required)"
                    />
                  </div>
                  <div className='flex flex-col gap-[0.3vh]'>
                    <label className='text-white font-bold text-[1vw]'>Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                      placeholder="enter product name (required)"
                    />
                  </div>
                  <div className='flex flex-col gap-[0.3vh]'>
                    <label className='text-white font-bold text-[1vw]'>Category</label>
                    <select
                      name="category"
                      className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                    >
                      <option></option>
                      <option>Miscellaneous</option>
                      <option>Stationery & Office Supplies</option>
                      <option>Tobacco & Smoking Accessories</option>
                      <option>Household Items</option>
                      <option>Health & Beauty</option>
                      <option>Frozen Foods</option>
                      <option>Dairy & Refrigerated Items</option>
                      <option>Grocery Items</option>
                      <option>Snacks</option>
                      <option>Beverages</option>
                    </select>
                  </div>
                </div>
                <div className='w-[32%] flex flex-col gap-3'>
                  <div className='flex flex-col gap-[0.3vh]'>
                    <label className='text-white font-bold text-[1vw]'>Unit Price</label>
                    <input
                      type="number"
                      name="unitPrice"
                      className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                      placeholder="enter unit price (required)"
                    />
                  </div>
                  <div className='flex flex-col gap-[0.3vh]'>
                    <label className='text-white font-bold text-[1vw]'>Wholesale Minimum Quantity (WSMQ)</label>
                    <input
                      type="number"
                      name="wsmq"
                      className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                      placeholder="enter WSMQ (required)"
                    />
                  </div>
                  <div className='flex flex-col gap-[0.3vh]'>
                    <label className='text-white font-bold text-[1vw]'>Wholesale Price (WSP)</label>
                    <input
                      type="number"
                      name="wsp"
                      className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                      placeholder="enter WSP (required)"
                    />
                  </div>
                </div>
                <div className='w-[32%] flex flex-col justify-between gap-3'>
                  <div className='flex flex-col gap-[0.3vh]'>
                    <label className='text-white font-bold text-[1vw]'>Reorder Level</label>
                    <input
                      type="number"
                      name="reorderLevel"
                      className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                      placeholder="enter reorder level (required)"
                    />
                  </div>
                  <div className='w-full flex items-end justify-between'>
                    <button className='w-[48%] px-[1vw] py-[1vh] bg-white opacity-[80%] text-[0.7vw] border border-black rounded-xl text-black hover:opacity-100 button'>
                      Add Backhouse Stock
                    </button>
                    <button className='w-[48%] px-[1vw] py-[1vh] bg-white opacity-[80%] text-[0.7vw] border border-black rounded-xl text-black hover:opacity-100 button'>
                      Convert Backhouse Stock
                    </button>
                  </div>
                  <div className='w-full flex items-end justify-end'>
                    <button className='w-[48%] px-[1vw] py-[1vh] bg-white text-[1vw] border border-black rounded-xl text-black hover:bg-green-500 hover:border-white hover:text-white button'>
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory
