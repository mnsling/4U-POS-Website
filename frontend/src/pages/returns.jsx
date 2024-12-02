import React, { useState, useEffect } from 'react'
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'
import open from '../assets/unboxing.png'
import exit from '../assets/reject.png'
import edit from '../assets/edit.png'
import del from '../assets/delete.png'
import right from '../assets/right-chevron.png'
import axios from 'axios';

const returns = () => {

  const [transactions, setTransactions] = useState([]);
  const [transactionItems, setTransactionItems] = useState([]);

  const [returns, setReturns] = useState([]);
  const [newReturn, setNewReturn] = useState({
    transactionID: null,
    status: 'VALIDATING',
    refundAmount: 0,
  });

  const [returnItems, setReturnItems] = useState([]);
  const [returnItem, setReturnItem] = useState({
    returnID: null,
    transactionItemID: null,
    itemQty: 0,
  });

  const handleReturnChange = (e) => {
    const { name, value } = e.target;

    setNewReturn(prevReturn => {
      const updatedReturn = {
        ...prevReturn,
        [name]: value,
      };
      // Log updated product here
      console.log('Updated product:', updatedReturn);
      return updatedReturn;
    });
  };

  const fetchTransactions = () => {
    axios.get('http://127.0.0.1:8000/transaction/')
      .then(response => {
        setTransactions(response.data);
        console.log(response.data); // Log the updated product list
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchTransactionItems = () => {
    axios.get('http://127.0.0.1:8000/transactionItem/')
      .then(response => {
        setTransactionItems(response.data);
        console.log(response.data); // Log the updated product list
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchReturns = () => {
    axios.get('http://127.0.0.1:8000/return/')
      .then(response => {
        setReturns(response.data);
        console.log(response.data); // Log the updated product list
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchReturnItems = () => {
    axios.get('http://127.0.0.1:8000/returnItem/')
      .then(response => {
        setReturnItems(response.data);
        console.log(response.data); // Log the updated product list
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {``
    fetchTransactions();
    fetchTransactionItems();
    fetchReturns();
    fetchReturnItems();
  }, []);

  const [currentReturn, setCurrentReturn] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const logResponse = await axios.post('http://127.0.0.1:8000/return/', {
        transactionID: newReturn.transactionID,
        dateCreated: '',
      });
  
      const currentReturn = logResponse.data;
  
      await fetchReturns();
  
      setCurrentReturn(currentReturn);
      setShowAddPrompt(false);
      setShowDetailsPrompt(true);
  
      console.log('Created Log:', newLog);
    } catch (error) {
      console.error('Error creating log:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = (returnId) => {
    axios.delete(`http://127.0.0.1:8000/return/${returnId}/`)
      .then(response => {
        console.log('Open Stock Log deleted:', response.data);
        fetchReturns();
        setCurrentReturn();
        handleClosePrompt();
      })
      .catch(error => {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
      });
  };

  const [activeButton, setActiveButton] = useState('DRAFT'); // Set the initial active button

  const [showDetailsPrompt, setShowDetailsPrompt] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [showAddItemPrompt, setShowAddItemPrompt] = useState(false);
  const [showEdit3Prompt, setShowEdit3Prompt] = useState(false);

  const handleDetailsClick = (currentReturn) => {
    setCurrentReturn(currentReturn);
    setActiveButton(currentReturn.status);
    setShowDetailsPrompt(true);
  };

  const handleAddClick = () => {
    setShowAddPrompt(true);
  };

  const handleEdit3Click = (item) => {
    setShowEdit3Prompt(true);
  };

  const handleCloseEdit3Prompt = () => {
    setShowEdit3Prompt(false);
  };

  const handleCloseAddPrompt = () => {
    setShowAddPrompt(false);
  };

  const handleClosePrompt = () => {
    setShowDetailsPrompt(false);
  };

  const handleAddItemClick = (item) => {
    setShowAddItemPrompt(true);
  };

  const handleCloseAddItemPrompt = () => {
    setShowAddItemPrompt(false);
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Returns</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-between'>
            <div className='w-[15.5vw] flex justify-between gap-5'>
              <input type='date' className='py-2 px-4 w-[8vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button' />
            </div>
            <div className='flex justify-between'>
              <button onClick={handleAddClick} className='px-[1vw] py-[0.8vh] text-[0.8vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Create Return</button>
            </div>
          </div>
          <div className='w-full h-[75vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[15%] text-[0.7vw] leading-tight text-center'>ID</h1>
              <h1 className='w-[15%] text-[0.7vw] leading-tight text-center'>Date</h1>
              <h1 className='w-[15%] text-[0.7vw] leading-tight text-center'>Invoice #</h1>
              <h1 className='w-[15%] text-[0.7vw] leading-tight text-center'>Refund Status</h1>
              <h1 className='w-[15%] text-[0.7vw] leading-tight text-center'>Refund Amount</h1>
              <h1 className='w-[15%] text-[0.7vw] text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
            {returns.map(currentReturn => {
                return (
                  <div key={currentReturn .id} className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                    <h1 className='w-[15%] text-[0.7vw] text-center'>{currentReturn.id}</h1>
                    <h1 className='w-[15%] text-[0.7vw] text-center'>{currentReturn.returnDate}</h1>
                    <h1 className='w-[15%] text-[0.7vw] text-center'>{currentReturn.transactionID}</h1>
                    <h1 className='w-[15%] text-[0.7vw] text-center'>{currentReturn.status}</h1>
                    <h1 className='w-[15%] text-[0.7vw] text-center'>{currentReturn.refundAmount}</h1>
                    <h1 className='w-[15%] flex gap-[1vw] justify-center'>
                    <img
                      src={open}
                      alt='edit'
                      className='w-[1.3vw] h-[1.3vw] cursor-pointer'
                      onClick={() => handleDetailsClick(currentReturn)}
                    />
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Prompt (Modal) kini kay mao na ni tong mga specific details sa records mismo */}
          {showDetailsPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex'>
              <div className='bg-white w-full h-full p-[2vw] flex flex-col items-start gap-5'>
                <div className='w-full flex items-center'>
                  <div className='w-full flex justify-start'>
                    <div className='text-darkp w-full flex flex-col gap-5'>
                      <div className='flex gap-10 items-end'>
                        <h1 className='text-[3vw] font-bold tracking-tighter'>ID #{currentReturn.id}</h1>
                        <div className='flex gap-3 h-fit justify-end items-end pb-5'>
                          <button onClick={() => handleDelete(currentReturn.id)} className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Delete</button>
                        </div>
                      </div>
                      <div className='w-full flex gap-10'>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Invoice #</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{currentReturn.transactionID}</h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Return Date:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{currentReturn.returnDate}</h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Refund Amount:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{currentReturn.refundAmount}</h1>
                          </div>
                        </div>
                        <div className='w-full flex justify-end items-end mb-2'>
                          <button onClick={handleAddItemClick} className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Add Item</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleClosePrompt} className='h-full pt-5 flex items-start'><img src={exit} className='w-[1.8vw] h-[1.8vw]' /></button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <div className='w-full h-[60vh] flex flex-col drop-shadow'>
                    <div className='h-[6vh] bg-darkp opacity-80 border border-darkp rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
                      <h1 className='w-[14%] text-[0.7vw] leading-tight text-center'>Product Name</h1>
                      <h1 className='w-[14%] text-[0.7vw] text-center'>Reference #</h1>
                      <h1 className='w-[14%] text-[0.7vw] leading-tight text-center'>Boxes Opened</h1>
                      <h1 className='w-[14%] text-[0.7vw] leading-tight text-center'>Previous Opened Qty.</h1>
                      <h1 className='w-[14%] text-[0.7vw] leading-tight text-center'>Qty. Added</h1>
                      <h1 className='w-[14%] text-[0.7vw] leading-tight text-center'>Damaged Qty.</h1>
                      <h1 className='w-[14%] text-[0.7vw] leading-tight text-center'>Actions</h1>
                    </div>
                    <div className='w-full h-full bg-white border-x rounded-b-2xl border-b border-darkp overflow-auto'>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className='text-[1vw] text-darkp font-bold tracking-tighter mb-2'>Status Bar:</h1>
                  <div className='w-min h-[3.5vw] rounded-2xl border border-darkp flex justify-between gap-5 font-medium tracking-tighter text-[.7vw] text-darkp px-2 py-6'>
                    {['VALIDATING', 'CONFIRMED'].map((status, index) => (
                      <div key={index} className='flex gap-2 w-full h-full items-center'>
                        <button
                          onClick={() => handleButtonClick(status)}
                          className={`py-3 px-3 hover:bg-darkp hover:text-white rounded-xl hover:rounded-xl button ${activeButton === status ? 'bg-darkp text-white rounded-xl' : ''}`}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {status}
                        </button>
                        {index < 1 && <img src={right} className='w-[1.2vw]' />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Prompt (Modal) kani sauna pmn ni nmo girequest pero yeah*/}
          {showAddPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[50vw] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Create Return</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Invoice #</label>
                      <select 
                        name='transactionID'
                        value={newReturn.transactionID}
                        onChange={handleReturnChange}
                        className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity'
                      >
                        <option value=''>-Choose Invoice #</option>
                        {transactions.map((transaction) => (
                          <option key={transaction.id} value={transaction.id}>
                            {transaction.id}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <button
                  onClick={handleSubmit}
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500 button'
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
          {showAddItemPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[50vw] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Create Return</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Invoice #</label>
                      <select 
                        name='transactionID'
                        value={newReturn.transactionID}
                        onChange={handleReturnChange}
                        className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity'
                      >
                        <option value=''>-Choose Invoice #</option>
                        {transactions.map((transaction) => (
                          <option key={transaction.id} value={transaction.id}>
                            {transaction.id}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <button
                  onClick={handleSubmit}
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500 button'
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
          {/* Prompt (Modal) na girequest ni master para sa edit item sa sulod sa stock records ngayong oct 17 lang */}
          {showEdit3Prompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[50vw] h-min p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Edit Item</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Product Name</label>
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Reference #</label>
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Boxes Opened</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Damaged Qty</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500 button'
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-red-500 button'
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

export default returns
