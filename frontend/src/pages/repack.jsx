import React, { useState, useEffect } from 'react'
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'
import open from '../assets/unboxing.png'
import exit from '../assets/reject.png'
import edit from '../assets/edit.png'
import del from '../assets/delete.png'
import right from '../assets/right-chevron.png'
import axios from 'axios';

const repack = () => {

  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [stockItems, setStockItems] = useState([]);

  const [repackStockLogs, setRepackStockLogs] = useState([]);
  const [repackStockLogItems, setRepackStockLogItems] = useState([]);
  const [repackStockLogItem, setRepackStockLogItem] = useState({
    logID: null,
    productID: null,
    stockID: null,
    stockItemID: null,
    referenceNumber: null,
    qtyUsed: 0,
    repackQty: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setRepackStockLogItem(prevLogItem => {
      // Create a copy of the previous log item
      const updatedLogItem = { ...prevLogItem, [name]: value };
  
      // If the productID is being updated, update stockID as well
      if (name === 'productID') {
        const selectedProduct = getProductForStockItem(value); // Assuming this function fetches the product for a given product ID
        updatedLogItem.stockID = selectedProduct.stock; // Update stockID or clear if no product matches
      }
  
      console.log('Updated Log Item:', updatedLogItem);
      return updatedLogItem;
    });
  };
  
  const getProductForStockItem = (productId) => {
    const product = products.find(p => String(p.id) === String(productId)) || { name: 'Unknown Product' };
    return product
  };

  const getStockForStockItem = (stockId) => {
    const stock = stocks.find(s => String(s.id) === String(stockId)) || { name: 'Unknown Product' };
    return stock
  };

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/repackedProduct/')
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

  const fetchRepackStockLogs = () => {
    axios.get('http://127.0.0.1:8000/repackStockLog/')
      .then(response => {
        setRepackStockLogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchRepackStockLogItems = () => {
    axios.get('http://127.0.0.1:8000/repackStockLogItem/')
      .then(response => {
        setRepackStockLogItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchStocks();
    fetchStockItems();
    fetchRepackStockLogs();
    fetchRepackStockLogItems();
  }, []);
  
  const [currentLog, setCurrentLog] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const logResponse = await axios.post('http://127.0.0.1:8000/repackStockLog/', {
        dateCreated: '',
      });
  
      const newLog = logResponse.data;
  
      await fetchRepackStockLogs();
  
      setCurrentLog(newLog);
      setShowDetailsPrompt(true);
  
      console.log('Created Log:', newLog);
    } catch (error) {
      console.error('Error creating log:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = (logId) => {
    axios.delete(`http://127.0.0.1:8000/repackStockLog/${logId}/`)
      .then(response => {
        console.log('Open Stock Log deleted:', response.data);
        fetchRepackStockLogs();
        setCurrentLog();
        handleClosePrompt();
      })
      .catch(error => {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
      });
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    const product = products.find(product => String(product.id) === String(repackStockLogItem.productID));
    const stockItemtoAdd = stockItems.find(stockItemtoAdd => {
      return String(stockItemtoAdd.referenceNumber) === String(repackStockLogItem.referenceNumber) &&
             String(stockItemtoAdd.stockID) === String(repackStockLogItem.stockID);
    });

    const qtyUsed = repackStockLogItem.repackQty * product.unitWeight;

    // Send POST request
    axios.post('http://127.0.0.1:8000/repackStockLogItem/', {
      logID: currentLog.id,
      productID: repackStockLogItem.productID,
      stockID: repackStockLogItem.stockID,
      stockItemID: stockItemtoAdd.id,
      referenceNumber: repackStockLogItem.referenceNumber,
      qtyUsed: qtyUsed,
      repackQty: repackStockLogItem.repackQty,
    })
      .then(response => {
        console.log('Product created:', response.data);
        setRepackStockLogItem({
          logID: null,
          productID: null,
          stockID: null,
          stockItemID: null,
          referenceNumber: null,
          qtyUsed: 0,
          repackQty: 0,
        })
        fetchRepackStockLogItems();
        handleCloseAddPrompt();
      })
      .catch(error => {
        console.error('Error creating product:', error.response.data);
      });
  };

  const [showDetailsPrompt, setShowDetailsPrompt] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [showEdit3Prompt, setShowEdit3Prompt] = useState(false);

  const handleDetailsClick = (logId) => {
    const currentItem = repackStockLogs.find(repackStockLog => repackStockLog.id === logId);
    setCurrentLog(currentItem);
    setActiveButton(currentItem.status);
    setShowDetailsPrompt(true);
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

  const handleClosePrompt = () => {
    setShowDetailsPrompt(false);
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
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Repack Stock</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-between'>
            <div className='w-[15.5vw] flex justify-between gap-5'>
              <input type='date' className='py-2 px-4 w-[8vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button' />
            </div>
            <div className='flex justify-between'>
              <button onClick={handleSubmit} className='px-[1vw] py-[0.8vh] text-[0.8vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Repack Stock</button>
            </div>
          </div>
          <div className='w-full h-[75vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[20%] text-[0.7vw] text-center'>ID</h1>
              <h1 className='w-[20%] text-[0.7vw] text-center'>Date</h1>
              <h1 className='w-[20%] text-[0.7vw] text-center'>Status</h1>
              <h1 className='w-[20%] flex gap-[1vw] justify-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              {repackStockLogs.map(repackStockLog => {
                return (
                  <div key={repackStockLog.id} className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                    <h1 className='w-[20%] text-[0.7vw] text-center'>{repackStockLog.id}</h1>
                    <h1 className='w-[20%] text-[0.7vw] text-center'>{repackStockLog.dateCreated}</h1>
                    <h1 className='w-[20%] text-[0.7vw] text-center'>{repackStockLog.status}</h1>
                    <h1 className='w-[20%] flex gap-[1vw] justify-center'>
                    <img
                      src={open}
                      alt='edit'
                      className='w-[1.3vw] h-[1.3vw] cursor-pointer'
                      onClick={() => handleDetailsClick(repackStockLog.id)}
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
                      <div className='w-full flex gap-10 justify-between'>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Date:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>11-17-2024</h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='w-full flex justify-end items-end mb-2'>
                            <button onClick={handleAddClick} className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Add Product</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleClosePrompt} className='h-full pt-5 flex items-start'><img src={exit} className='w-[1.8vw] h-[1.8vw]' /></button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  
                  <div className='w-full h-[50vh] flex flex-col drop-shadow'>
                    <div className='h-[6vh] bg-darkp opacity-80 border border-darkp rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
                      <h1 className='w-[15%] text-[0.7vw] leading-tight text-center'>Product Name</h1>
                      <h1 className='w-[15%] text-[0.7vw] text-center'>Reference #</h1>
                      <h1 className='w-[15%] text-[0.7vw] leading-tight text-center'>Qty. Used</h1>
                      <h1 className='w-[15%] text-[0.7vw] leading-tight text-center'>Qty. Added</h1>
                      <h1 className='w-[15%] text-[0.7vw] leading-tight text-center'>Mother Stock</h1>
                      <h1 className='w-[15%] text-[0.7vw] leading-tight text-center'>Actions</h1>
                    </div>
                    <div className='w-full h-full bg-white border-x rounded-b-2xl border-b border-darkp overflow-auto'>
                      {repackStockLogItems
                        .filter(repackStockLogItem => repackStockLogItem.logID === currentLog.id)
                        .map(repackStockLogItem => {
                        const product = getProductForStockItem(repackStockLogItem.productID)
                        const stock = getStockForStockItem(repackStockLogItem.stockID)
                          return (
                            <div key={repackStockLogItem.id} className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                              <h1 className='w-[15%] text-[0.7vw] text-center'>{product.name}</h1>
                              <h1 className='w-[15%] text-[0.7vw] text-center'>{repackStockLogItem.referenceNumber}</h1>
                              <h1 className='w-[15%] text-[0.7vw] text-center'>{repackStockLogItem.qtyUsed}</h1>
                              <h1 className='w-[15%] text-[0.7vw] text-center'>{repackStockLogItem.repackQty}</h1>
                              <h1 className='w-[15%] text-[0.7vw] text-center'>{stock.stockName}</h1>
                              <div className='w-[15%] flex justify-center gap-5'>
                                <img
                                  src={edit}
                                  alt='edit'
                                  className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                                  onClick={() => handleEdit3Click(repackStockLogItem)}
                                />
                                <img
                                  src={del}
                                  alt='delete'
                                  className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                                  onClick={() => handleDeleteItem(repackStockLogItem.id)}
                                />
                              </div>
                            </div>
                          );
                      })}
                    </div>
                  </div>
                  <div className="mt-3">
                    <h1 className="text-[1vw] text-darkp font-bold tracking-tighter mb-2">Status Bar:</h1>
                    <div className="w-[16vw] h-[3.5vw] rounded-2xl border border-darkp flex justify-center items-center gap-2 font-medium tracking-tighter text-[.7vw] text-darkp">
                      <button
                        onClick={() => handleButtonClick('VALIDATING')}
                        className={`py-3 px-4 hover:bg-darkp hover:text-white rounded-xl button ${activeButton === 'VALIDATING' ? 'bg-darkp text-white rounded-xl' : ''
                          }`}
                      >
                        VALIDATING
                      </button>
                      <img src={right} className="w-[1.5vw] h-[1.2vw]" />
                      <button
                        onClick={() => handleButtonClick('CONFIRMED')}
                        className={`py-3 px-4 hover:bg-darkp hover:text-white rounded-xl button ${activeButton === 'CONFIRMED' ? 'bg-darkp text-white rounded-xl' : ''
                          }`}
                      >
                        CONFIRMED
                      </button>
                    </div>
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
                          name="productID"
                          value={repackStockLogItem.productID}
                          onChange={handleChange}
                          className={`w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]`}
                        >
                          <option value="">-Choose Product-</option>
                          {products
                            .map(product => {
                            return (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            );
                          })}
                        </select>
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Reference #</label>
                      <select 
                        name='referenceNumber'
                        value={repackStockLogItem.referenceNumber}
                        onChange={handleChange}
                        className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]'
                      >
                        <option>-Reference Number-</option>
                        {stockItems
                          .filter(stockItem => {
                            return (
                            stockItem.stockID === parseInt(repackStockLogItem.stockID) &&
                            stockItem.closedStock > 0
                          )})
                          .map(stockItem => (
                            <option key={stockItem.id} value={stockItem.referenceNumber}>
                              {stockItem.referenceNumber} - {stockItem.expiryDate ? stockItem.expiryDate : "N/A"}
                            </option>
                        ))}
                      </select>
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Repack Amount</label>
                      <input name='repackQty' value={repackStockLogItem.repackQty} onChange={handleChange} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-green-500 button'
                    onClick={handleAddItem}
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
                      <input type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter product' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Reference #</label>
                      <select className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' >
                        <option>2020240001</option>
                      </select>
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Stocks Opened</label>
                      <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
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

export default repack