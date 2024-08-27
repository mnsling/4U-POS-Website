import React, { useState } from 'react'
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'
import del from '../assets/delete.png'
import edit from '../assets/edit.png'

const Stock = () => {
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

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-10/12 h-full'>
        <div className='w-full h-20 bg-white flex items-center justify-between px-10 drop-shadow-xl z-10'>
          <h1 className='text-2xl text-darkp font-medium tracking-tighter'>Stock In</h1>
        </div>
        <div className='h-5/6 w-full p-10 pb-0 flex flex-col gap-5'>
          <div className='w-full flex justify-between gap-2'>
            <div className='flex gap-2'>
              <select className='py-2 px-4 bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                <option>Select Supplier</option>
              </select>
              <input type='date' className='py-2 px-4 bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button'/>
            </div>
            <button className='bg-white px-4 py-2 text-darkp text-md font-light outline-none w-2/12 rounded-xl border border-darkp hover:bg-darkp hover:text-white button'>Create New Order</button>
          </div>
          <div className='w-full h-full rounded-2xl flex flex-col justify-between items-center gap-5'>
            <div className='h-full w-full flex flex-col rounded-b-2xl drop-shadow-2xl overflow-y-scroll hide-scrollbar'>
              <div className='h-10 bg-darkp opacity-80 rounded-t-2xl text-white text-sm flex justify-between items-center px-10'>
                <h1 className='w-2/12 text-center'>Stock Record #</h1>
                <h1 className='w-2/12 text-center'>Tracking #</h1>
                <h1 className='w-2/12 text-center'>Supplier Name</h1>
                <h1 className='w-2/12 text-center'>Order Date</h1>
                <h1 className='w-2/12 text-center'>Status</h1>
                <h1 className='w-2/12 text-center'>Delivery Fee</h1>
                <h1 className='w-2/12 text-center'>Total Amount</h1>
                <h1 className='w-2/12 text-center'>Actions</h1>
              </div>
              <div className='h-full w-full bg-white rounded-b-2xl drop-shadow-2xl overflow-y-scroll hide-scrollbar'>
                {products.map((product, index) => (
                  <div key={index} className='w-full text-darkp text-center flex items-center justify-between px-10 py-2 border-b border-gray-200'>
                    <h1 className='w-2/12'>{product.barcode}</h1>
                    <h1 className='w-2/12'>{product.productName}</h1>
                    <h1 className='w-2/12'>{product.category}</h1>
                    <h1 className='w-2/12'>{product.currentStock}</h1>
                    <h1 className='w-2/12'>{formatDecimal(product.unitPrice)}</h1>
                    <h1 className='w-2/12'>{product.wsmq}</h1>
                    <h1 className='w-2/12'>{formatDecimal(product.wsp)}</h1>
                    <h1 className='w-2/12 flex gap-5 justify-center'>
                      <button><img src={edit} className='w-5' alt='Edit' /></button>
                      <button><img src={del} className='w-6' alt='Delete' /></button>
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stock