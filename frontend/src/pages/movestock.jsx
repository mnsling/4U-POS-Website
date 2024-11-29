import React, { useState, useEffect } from 'react'
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'
import open from '../assets/unboxing.png'
import exit from '../assets/reject.png'
import edit from '../assets/edit.png'
import del from '../assets/delete.png'
import right from '../assets/right-chevron.png'
import axios from 'axios';

const movestock = () => {

  const [stocks, setStocks] = useState([]);
  const [stockItems, setStockItems] = useState([]);
  const [products, setProducts] = useState([]);

  const [moveStockLogs, setMoveStockLogs] = useState([]);
  const [moveStockLogItems, setMoveStockLogItems] = useState([]);
  const [moveStockLogItem, setMoveStockLogItem] = useState({
    logID: null,
    productID: null,
    stockItemID: null,
    referenceNumber: null,
    previousQty: 0,
    stocksMoved: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMoveStockLogItem(prevLogItem => {
      const updatedLogItem = {
        ...prevLogItem,
        [name]: value,
      };
      console.log('Updated Log Item:', updatedLogItem);
      return updatedLogItem;
    });
  };

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/product/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchStocks = () => {
    axios.get('http://127.0.0.1:8000/stock/')
      .then(response => {
        setStocks(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchStockItems = () => {
    axios.get('http://127.0.0.1:8000/stockItem/')
      .then(response => {
        setStockItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error.response.data);
      });
  };

  const fetchMoveStockLogs = () => {
    axios.get('http://127.0.0.1:8000/moveStockLog/')
      .then(response => {
        setMoveStockLogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchMoveStockLogItems = () => {
    axios.get('http://127.0.0.1:8000/moveStockLogItem/')
      .then(response => {
        setMoveStockLogItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchStocks();
    fetchStockItems();
    fetchMoveStockLogs();
    fetchMoveStockLogItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const logResponse = await axios.post('http://127.0.0.1:8000/moveStockLog/', {
        dateCreated: '',
      });
  
      const newLog = logResponse.data;
  
      await fetchMoveStockLogs();
  
      setCurrentLog(newLog);
      setShowDetailsPrompt(true);
  
      console.log('Created Log:', newLog);
    } catch (error) {
      console.error('Error creating log:', error.response ? error.response.data : error.message);
    }
  };  

  const [currentLog, setCurrentLog] = useState([]);

  const handleDelete = (logId) => {
    axios.delete(`http://127.0.0.1:8000/moveStockLog/${logId}/`)
      .then(response => {
        console.log('Open Stock Log deleted:', response.data);
        fetchMoveStockLogs();
        setCurrentLog();
        handleClosePrompt();
      })
      .catch(error => {
        console.error('Error deleting log:', error.response ? error.response.data : error.message);
      });
  };
  
  const handleButtonClick = (newStatus) => {
    setActiveButton(newStatus);
    
    // Send the status update to the server using Axios
    axios.put(`http://127.0.0.1:8000/moveStockLog/${currentLog.id}/`, {
      status: newStatus,
    })
      .then(response => {
        console.log('Status updated:', response.data);
        fetchMoveStockLogs();
        setActiveButton(newStatus);
      })
      .catch(error => {
        console.error('Error updating status:', error.response.data);
      });
  };

  const getProductForStockItem = (stockItemId) => {
    const product = products.find(p => String(p.id) === String(stockItemId)) || { name: 'Unknown Product' };
    return product
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    const stockItemtoAdd = stockItems.find(stockItemtoAdd => String(stockItemtoAdd.referenceNumber) === String(moveStockLogItem.referenceNumber));   

    // Send POST request
    axios.post('http://127.0.0.1:8000/moveStockLogItem/', {
      logID: currentLog.id,
      productID: moveStockLogItem.productID,
      stockItemID: stockItemtoAdd.id,
      referenceNumber: moveStockLogItem.referenceNumber,
      previousQty: stockItemtoAdd.displayedStock,
      stocksMoved: moveStockLogItem.stocksMoved,
    })
      .then(response => {
        console.log('Product created:', response.data);
        setMoveStockLogItem({
          logID: null,
          productID: null,
          stockItemID: null,
          referenceNumber: null,
          previousQty: 0,
          stocksMoved: 0,
        })
        fetchMoveStockLogItems();
        handleCloseAddPrompt();
      })
      .catch(error => {
        console.error('Error creating product:', error.response.data);
      });
  };

  const handleDeleteItem = (itemId) => {
    axios.delete(`http://127.0.0.1:8000/moveStockLogItem/${itemId}/`)
      .then(response => {
        console.log('Open Stock Log deleted:', response.data);
        fetchMoveStockLogItems();
        setCurrentLog();
        handleClosePrompt();
      })
      .catch(error => {
        console.error('Error deleting log:', error.response ? error.response.data : error.message);
      });
  };

  const [currentItemID, setCurrentItemID] = useState([]);

  const handleUpdateItem = (e) => {
    e.preventDefault();

    const stockItemtoAdd = stockItems.find(stockItemtoAdd => String(stockItemtoAdd.referenceNumber) === String(moveStockLogItem.referenceNumber));   

    // Send POST request
    axios.put(`http://127.0.0.1:8000/moveStockLogItem/${currentItemID}/`, {
      logID: currentLog.id,
      productID: moveStockLogItem.productID,
      stockItemID: stockItemtoAdd.id,
      referenceNumber: moveStockLogItem.referenceNumber,
      previousQty: stockItemtoAdd.displayedStock,
      stocksMoved: moveStockLogItem.stocksMoved,
    })
      .then(response => {
        console.log('Product created:', response.data);
        setMoveStockLogItem({
          logID: null,
          productID: null,
          stockItemID: null,
          referenceNumber: null,
          previousQty: 0,
          stocksMoved: 0,
        })
        fetchMoveStockLogItems();
        handleCloseEdit3Prompt();
      })
      .catch(error => {
        console.error('Error creating product:', error.response.data);
      });
  };

  const [showDetailsPrompt, setShowDetailsPrompt] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [showEdit3Prompt, setShowEdit3Prompt] = useState(false);
  const [activeButton, setActiveButton] = useState('VALIDATING');

  const handleDetailsClick = (logId) => {
    const currentItem = moveStockLogs.find(moveStockLog => moveStockLog.id === logId);
    setCurrentLog(currentItem);
    setActiveButton(currentItem.status);
    setShowDetailsPrompt(true);
  };

  const handleAddClick = () => {
    setShowAddPrompt(true);
  };

  const handleEdit3Click = (item) => {
    setCurrentItemID(item.id)
    setMoveStockLogItem({
      productID: item.productID,
      referenceNumber: item.referenceNumber,
      stocksMoved: item.stocksMoved,
    });
    setShowEdit3Prompt(true);
  };

  const handleCloseEdit3Prompt = () => {
    setShowEdit3Prompt(false);
  };

  const handleCloseAddPrompt = () => {
    setShowAddPrompt(false);
  };

  const handleClosePrompt = () => {
    setActiveButton('VALIDATING');
    setShowDetailsPrompt(false);
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Move Stock</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-between'>
            <div className='w-[15.5vw] flex justify-between gap-5'>
              <input type='date' className='py-2 px-4 w-[8vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button' />
            </div>
            <div className='flex justify-between'>
              <button onClick={handleSubmit} className='px-[1vw] py-[0.8vh] text-[0.8vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Move Stock</button>
            </div>
          </div>
          <div className='w-full h-[75vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[20%] text-[0.7vw] leading-tight text-center'>ID</h1>
              <h1 className='w-[20%] text-[0.7vw] leading-tight text-center'>Date</h1>
              <h1 className='w-[20%] text-[0.7vw] leading-tight text-center'>Status</h1>
              <h1 className='w-[20%] text-[0.7vw] text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              {moveStockLogs.map(moveStockLog => {
                  return (
                    <div key={moveStockLog.id} className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                      <h1 className='w-[20%] text-[0.7vw] text-center'>{moveStockLog.id}</h1>
                      <h1 className='w-[20%] text-[0.7vw] text-center'>{moveStockLog.dateCreated}</h1>
                      <h1 className='w-[20%] text-[0.7vw] text-center'>{moveStockLog.status}</h1>
                      <h1 className='w-[20%] flex gap-[1vw] justify-center'>  
                      <img
                        src={open}
                        alt='edit'
                        className='w-[1.3vw] h-[1.3vw] cursor-pointer'
                        onClick={() => handleDetailsClick(moveStockLog.id)}
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
                        <h1 className='text-[3vw] font-bold tracking-tighter'>ID #{currentLog.id}</h1>
                        <div className='flex gap-3 h-fit justify-end items-end pb-5'>
                          <button onClick={() => handleDelete(currentLog.id)} className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Delete</button>
                        </div>
                      </div>
                      <div className='w-full flex gap-10'>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Date:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>11-17-2024</h1>
                          </div>
                        </div>
                        <div className='w-full flex justify-end items-end mb-2'>
                          <button onClick={handleAddClick} className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Add Product</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleClosePrompt} className='h-full pt-5 flex items-start'><img src={exit} className='w-[1.8vw] h-[1.8vw]' /></button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <div className='w-full h-[68vh] flex flex-col drop-shadow'>
                    <div className='h-[6vh] bg-darkp opacity-80 border border-darkp rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
                      <h1 className='w-[18%] text-[0.7vw] leading-tight text-center'>Product Name</h1>
                      <h1 className='w-[18%] text-[0.7vw] text-center'>Reference #</h1>
                      <h1 className='w-[18%] text-[0.7vw] leading-tight text-center'>Previous Qty.</h1>
                      <h1 className='w-[18%] text-[0.7vw] leading-tight text-center'>Stocks Moved</h1>
                      <h1 className='w-[18%] text-[0.7vw] leading-tight text-center'>Actions</h1>
                    </div>
                    <div className='w-full h-full bg-white border-x rounded-b-2xl border-b border-darkp overflow-auto'>
                      {moveStockLogItems
                        .filter(moveStockLogItem => moveStockLogItem.logID === currentLog.id)
                        .map(moveStockLogItem => {
                        const product = getProductForStockItem(moveStockLogItem.productID)
                          return (
                            <div key={moveStockLogItem.id} className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                              <h1 className='w-[18%] text-[0.7vw] text-center'>{product.name}</h1>
                              <h1 className='w-[18%] text-[0.7vw] text-center'>{moveStockLogItem.referenceNumber}</h1>
                              <h1 className='w-[18%] text-[0.7vw] text-center'>{moveStockLogItem.previousQty}</h1>
                              <h1 className='w-[18%] text-[0.7vw] text-center'>{moveStockLogItem.stocksMoved}</h1>
                              <div className='w-[18%] flex justify-center gap-5'>
                                <img
                                  src={edit}
                                  alt='edit'
                                  className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                                  onClick={() => handleEdit3Click(moveStockLogItem)}
                                />
                                <img
                                  src={del}
                                  alt='delete'
                                  className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                                  onClick={() => handleDeleteItem(moveStockLogItem.id)}
                                />
                              </div>
                            </div>
                          );
                      })}
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
              <div className='bg-white w-[50vw] h-min p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Add Product</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Product Name</label>
                      <select
                        name='productID'
                        value={moveStockLogItem.productID}
                        onChange={handleChange}
                        className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]'
                        placeholder='enter name'
                      >
                        <option>-Choose Product-</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Reference #</label>
                      <select 
                        name='referenceNumber'
                        value={moveStockLogItem.referenceNumber}
                        onChange={handleChange}
                        className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]'
                      >
                        <option>-Reference Number-</option>
                        {stockItems
                          .filter(stockItem => {
                            // Step 1: Find the stock that matches stockItem.stockID
                            const matchingStock = stocks.find(stock => stock.id === stockItem.stockID);

                            // Step 2: Check if the matchingStock's productID matches openStockLogItem.productID
                            return (
                              matchingStock && // Ensure stock is found
                              matchingStock.productId === parseInt(moveStockLogItem.productID) &&
                              stockItem.openStock > 0
                            );
                          })
                          .map(stockItem => (
                            <option key={stockItem.id} value={stockItem.referenceNumber}>
                              {stockItem.referenceNumber} - {stockItem.expiryDate ? stockItem.expiryDate : "N/A"}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Stocks Moved</label>
                      <input name='stocksMoved' value={moveStockLogItem.stocksMoved} onChange={handleChange} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500 button'
                    onClick={handleAddItem}
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
                      <select
                        name='productID'
                        value={moveStockLogItem.productID}
                        onChange={handleChange}
                        className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]'
                        placeholder='enter name'
                      >
                        <option>-Choose Product-</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Reference #</label>
                      <select 
                        name='referenceNumber'
                        value={moveStockLogItem.referenceNumber}
                        onChange={handleChange}
                        className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]'
                      >
                        <option>-Reference Number-</option>
                        {stockItems
                          .filter(stock =>
                            stock.productID === parseInt(moveStockLogItem.productID) &&
                            stock.closedStock > 0
                          ) 
                          .map(stock => {
                            return (
                              <option key={stock.id} value={stock.referenceNumber}>
                                {stock.referenceNumber} - {stock.expiryDate ? stock.expiryDate : "N/A"}
                              </option>
                            );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Stocks Moved</label>
                      <input name='stocksMoved' value={moveStockLogItem.stocksMoved} onChange={handleChange} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500 button'
                    onClick={handleUpdateItem}
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

export default movestock