import React, { useState, useEffect } from 'react';
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'
import info from '../assets/info.png'
import exit from '../assets/reject.png'
import edit from '../assets/edit.png'
import del from '../assets/delete.png'
import right from '../assets/right-chevron.png'
import axios from 'axios';

const Records = () => {

  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState({
    id: '',
    supplierId: '',
    trackingNumber: '', 
    deliveryFee: 0,
    totalAmount: 0,
    status: 'PENDING',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRecord(prevRecord => {
      const updatedRecord = {
        ...prevRecord,
        [name]: value,
      };
      console.log('Updated record:', updatedRecord);
      return updatedRecord;
    });
  };

  useEffect(() => {
    fetchSuppliers();
    fetchRecords();
    fetchProducts();
    console.log(record);
  }, [record]);

  const getSupplierForRecord = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier || { supplierName: 'Unknown Supplier' };
  };

  const fetchSuppliers = () => {
    axios.get('http://127.0.0.1:8000/supplier/')
      .then(response => {
        setSuppliers(response.data);
        console.log(response.data); // Log the updated product list
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchRecords = () => {
    axios.get('http://127.0.0.1:8000/stockRecord/')
      .then(response => {
        setRecords(response.data);
        console.log(response.data); // Log the updated product list
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/product/')
      .then(response => {
        setProducts(response.data);
        console.log(response.data); // Log the updated product list
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request
    axios.post('http://127.0.0.1:8000/stockRecord/', {
      supplierId: record.supplierId,
      trackingNumber: record.trackingNumber, 
      deliveryFee: record.deliveryFee,
      totalAmount: 0,
      status: record.status,
    })
      .then(response => {
        console.log('Record created:', response.data);
        setRecord({
          supplierId: '',
          trackingNumber: '', 
          deliveryFee: 0,
          totalAmount: 0,
          status: 'PENDING',
        })
        fetchRecords();
        handleClosePrompt();
      })
      .catch(error => {
        console.error('Error creating record:', error.response.data);
      });
  };

  const handleUpdate = () => {
    // Send POST request
    axios.put(`http://127.0.0.1:8000/stockRecord/${record.id}/`, {
      supplierId: record.supplierId,
      trackingNumber: record.trackingNumber, 
      deliveryFee: record.deliveryFee,
      totalAmount: record.totalAmount,
      status: record.status,
    })
      .then(response => {
        console.log('Record Updated:', response.data);
        fetchRecords();
        handleCloseEdit2Prompt();
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:8000/stockRecord/${record.id}/`)
      .then(response => {
        console.log('Record deleted:', response.data);
        fetchRecords();
        handleClosePrompt();
      })
      .catch(error => {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
      });
  };

  const [showDetailsPrompt, setShowDetailsPrompt] = useState(false);
  const [showFormPrompt, setShowFormPrompt] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [showEdit2Prompt, setShowEdit2Prompt] = useState(false);

  const handleDetailsClick = (showRecord) => {
    setShowDetailsPrompt(true);
    setRecord({
      id: showRecord.id,
      supplierId: showRecord.supplierId,
      trackingNumber: showRecord.trackingNumber, 
      dateOrdered: showRecord.dateOrdered,
      dateDelivered: showRecord.dateDelivered,
      deliveryFee: showRecord.deliveryFee,
      totalAmount: showRecord.totalAmount,
      status: showRecord.status,
    })

    setActiveButton(showRecord.status);
    console.log(record);
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
    setRecord({
      id: '',
      supplierId: '',
      trackingNumber: '', 
      dateOrdered: null,
      dateDelivered: null,
      deliveryFee: 0,
      totalAmount: 0,
      status: 'PENDING',
    })
  };

  const [activeButton, setActiveButton] = useState('PENDING'); // Set the initial active button

  const handleButtonClick = (newStatus) => {
      setActiveButton(newStatus);
      
      // Send the status update to the server using Axios
      axios.put(`http://127.0.0.1:8000/stockRecord/${record.id}/`, {
        status: newStatus,
      })
        .then(response => {
          console.log('Status updated:', response.data);
          fetchRecords();
          setActiveButton(newStatus);
        })
        .catch(error => {
          console.error('Error updating status:', error);
        });
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
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center'>
              <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Stock Record #</h1>
              <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Tracking #</h1>
              <h1 className='w-[12%] text-[0.7vw] text-center'>Supplier Name</h1>
              <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Order Date</h1>
              <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Date Delivered</h1>
              <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Status</h1>
              <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Delivery Fee</h1>
              <h1 className='w-[12%] text-[0.7vw] text-center'>Total Amount</h1>
              <h1 className='w-[12%] text-[0.7vw] text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              <div className='h-[9%] flex flex-col items-center justify-between'>
              {records.map(record => {
                  const supplier = getSupplierForRecord(record.supplierId);
                  return (
                    <div key={record.id} className='w-full border-b border-darkp text-darkp text-center flex items-center justify-between py-2'>
                      <h1 className='w-[12%] text-[0.7vw] text-center'>{record.id}</h1>
                      <h1 className='w-[12%] text-[0.7vw] text-center'>{record.trackingNumber}</h1>
                      <h1 className='w-[12%] text-[0.7vw] text-center'>{supplier.supplierName}</h1>
                      <h1 className='w-[12%] text-[0.7vw] text-center'>{record.dateOrdered}</h1>
                      <h1 className='w-[12%] text-[0.7vw] text-center'>{record.dateDelivered}</h1>
                      <h1 className='w-[12%] text-[0.7vw] text-center'>{record.status}</h1>
                      <h1 className='w-[12%] text-[0.7vw] text-center'>{record.deliveryFee}</h1>
                      <h1 className='w-[12%] text-[0.7vw] text-center'>{record.totalAmount}</h1>
                      <h1 className='w-[12%] flex gap-[1vw] justify-center'>
                        <button onClick={() => handleDetailsClick(record)}><img src={info} alt='edit' className='w-[0.8vw] h-[0.8vw] cursor-pointer'/></button>
                      </h1>
                    </div>
                  );
                })}
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
                      <select
                        name="supplierId"
                        value={record.supplierId}
                        onChange={handleChange}
                        className={`className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' `}
                        placeholder="enter supplier*"
                      >
                        {suppliers.map(supplier => {
                          return (
                            <option key={supplier.id} value={supplier.id}>
                              {supplier.supplierName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Tracking #</label>
                      <input name="trackingNumber" value={record.trackingNumber} onChange={handleChange} type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter tracking #' />
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Delivery Fee</label>
                      <input name="deliveryFee" value={record.deliveryFee} onChange={handleChange} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter fee amount' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Status</label>
                      <select name='status' value={record.status} onChange={handleChange} className='w-full border border-darkp rounded-md px-5 py-2'>
                        <option value='PENDING'>Pending</option>
                        <option value='APPROVED'>Approved</option>
                        <option value='IN TRANSIT'>In Transit</option>
                        <option value='DELIVERED'>Delivered</option>
                        <option value='CANCELLED'>Cancelled</option>
                        <option value='BACKORDER'>Backorder</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500 button'
                    onClick={handleSubmit}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-red-500 button'
                    onClick={handleClosePrompt}
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
                        <h1 className='text-[3vw] font-bold tracking-tighter'>STOCK RECORD #{record.id}</h1>
                        <div className='flex gap-3 h-fit justify-end items-end pb-5'>
                          <button className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button' onClick={handleEdit2Click}>Edit</button>
                          <button className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'onClick={handleDelete}>Delete</button>
                        </div>
                      </div>
                      <div className='w-full flex gap-10'>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Tracking #:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{record.trackingNumber}</h1>
                          </div>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Supplier Name:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{getSupplierForRecord(record.supplierId).supplierName}</h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Order Date:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{record.dateOrdered}</h1>
                          </div>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Date Delivered:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{record.dateDelivered}</h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Delivery Fee:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{record.deliveryFee}</h1>
                          </div>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Total Amount:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{record.totalAmount}</h1>
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
                  <div className='mt-3'>
                    <h1 className='text-[1vw] text-darkp font-bold tracking-tighter mb-2'>Status Bar:</h1>
                    <div className='w-min h-[3.5vw] rounded-2xl border border-darkp flex justify-between gap-5 font-medium tracking-tighter text-[.7vw] text-darkp px-2 py-6'>
                      {['PENDING', 'APPROVED', 'IN TRANSIT', 'DELIVERED', 'CANCELLED', 'BACKORDER'].map((status, index) => (
                        <div key={index} className='flex gap-2 w-full h-full items-center'>
                          <button
                            onClick={() => handleButtonClick(status)}
                            className={`py-3 px-3 hover:bg-darkp hover:text-white rounded-xl hover:rounded-xl button ${activeButton === status ? 'bg-darkp text-white rounded-xl' : ''}`}
                            style={{ whiteSpace: 'nowrap' }}
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
                      <select
                        name="name"
                        onChange={handleChange}
                        className={`className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' `}
                        placeholder="enter product*"
                      >
                        {products.map(product => {
                          return (
                            <option key={product.id} value={product.id}>
                              {product.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Quantity Ordered</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
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
          {/* Prompt (Modal) */}
          {showEdit2Prompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[50vw] h-[40vh] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Stock Record</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Tracking #</label>
                      <input name='trackingNumber' onChange={handleChange} value={record.trackingNumber} type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter tracking #' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Supplier Name</label>
                      <select
                        name="supplierId"
                        value={record.supplierId}
                        onChange={handleChange}
                        className={`w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' `}
                        placeholder="enter supplier*"
                      >
                        {suppliers.map(supplier => {
                          return (
                            <option key={supplier.id} value={supplier.id}>
                              {supplier.supplierName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Total Amount</label>
                      <input name='totalAmount' onChange={handleChange} value={record.totalAmount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter amount' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Delivery Fee</label>
                      <input name='deliveryFee' onChange={handleChange} value={record.deliveryFee} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter amount' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500 button'
                    onClick={handleUpdate}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-red-500 button'
                    onClick={handleCloseEdit2Prompt}
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