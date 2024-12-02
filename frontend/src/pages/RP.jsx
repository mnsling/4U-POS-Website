import React, { useState, useEffect } from 'react';
import bg from '../assets/bg.jpg';
import Sidebar from '../components/sidebar';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
import info from '../assets/info.png';
import exit from '../assets/reject.png';
import move from '../assets/loop.png';
import open from '../assets/unboxing.png';
import out from '../assets/not-available.png'
import axios from 'axios';

const rp = () => {

  const [suppliers, setSuppliers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [stock, setStock] = useState({
    stockName: null,
    supplier: null,
    backhouseStock: 0,
    backUoM: '',
    standardQuantity: 0,
    displayStock: 0,
    displayUoM: '',
  });

  const [stockItems, setStockItems] = useState([]);
  const [stockItem, setStockItem] = useState({
    productID: null,
    stockID: null,
    referenceNumber: null,
    closedStock: 0,
    openStock: 0,
    toDisplayStock: 0,
    displayedStock: 0,
    damagedStock: 0,
    stockedOutQty: 0,
    stockOutDescription: '',
    expiryDate: '',
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchStocks();
    fetchStockItems();
    fetchSuppliers();
  }, []);

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

  const fetchStocks = () => {
    axios.get('http://127.0.0.1:8000/stock/')
      .then(response => {
        setStocks(response.data);
        console.log(response.data); // Log the updated product list
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchStockItems = () => {
    axios.get('http://127.0.0.1:8000/stockItem/')
      .then(response => {
        setStockItems(response.data);
        console.log(response.data); // Log the updated product list
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStock(prevStock => {
      const updatedStock = {
        ...prevStock,
        [name]: value,
      };
      console.log('Updated stock:', updatedStock);
      return updatedStock;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request
    axios.post('http://127.0.0.1:8000/stock/', {
      stockName: stock.stockName,
      supplier: stock.supplier,
      backhouseStock: 0,
      backUoM: stock.backUoM,
      standardQuantity: stock.standardQuantity,
      displayStock: 0,
      displayUoM: stock.displayUoM
    })
      .then(response => {
        console.log('Stock created:', response.data);
        setStock({
          stockName: null,
          supplier: null,
          backhouseStock: 0,
          backUoM: '',
          standardQuantity: 0,
          displayStock: 0,
          displayUoM: '',
        })
        fetchStocks();
        handleFormClosePrompt();
      })
      .catch(error => {
        console.error('Error creating stock:', error.response.data);
      });
  };

  const handleDelete = (stockId) => {
    axios.delete(`http://127.0.0.1:8000/stock/${stockId}/`)
      .then(response => {
        console.log('Supplier deleted:', response.data);
        setStock({
          stockName: null,
          supplier: null,
          backhouseStock: 0,
          backUoM: '',
          standardQuantity: 0,
          displayStock: 0,
          displayUoM: '',
        })
        fetchStocks();
        handleDetailsClosePrompt();
      })
      .catch(error => {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Send POST request
    axios.put(`http://127.0.0.1:8000/stock/${displayStockId}/`, {
      stockName: stock.stockName,
      supplier: stock.supplier,
      backhouseStock: 0,
      backUoM: stock.backUoM,
      standardQuantity: stock.standardQuantity,
      displayStock: 0,
      displayUoM: stock.displayUoM
    })
      .then(response => {
        console.log('Stock created:', response.data);
        setStock({
          stockName: null,
          supplier: null,
          backhouseStock: 0,
          backUoM: '',
          standardQuantity: 0,
          displayStock: 0,
          displayUoM: '',
        })
        fetchStocks();
        handleEditClosePrompt();
      })
      .catch(error => {
        console.error('Error creating stock:', error.response.data);
      });
  };

  const getSupplierForStock = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId) || { name: 'Unknown Product' };
    return supplier;
  };

  const [displayStockId, setDisplayStockId] = useState([]);
  const [displayStock, setDisplayStock] = useState([]);
  const [displayStockItemId, setDisplayStockItemId] = useState([]);
  const [displayStockItem, setDisplayStockItem] = useState([]);

  const getDisplayStockById = (id) => {
    const stock = stocks.find(stock => stock.id === id);
    setDisplayStock(stock);
    setStock({
      supplier: stock.supplier,
      backUoM: stock.backUoM,
      displayUoM: stock.displayUoM,
    })
  };

  const getDisplayStockItemById = (id) => {
    const stockItem = stockItems.find(stockItem => stockItem.id === id);
    setDisplayStockItem(stockItem);
  };

  const [showEditPrompt, setShowEditPrompt] = useState(false);
  const [showFormPrompt, setShowFormPrompt] = useState(false);
  const [showDetailsPrompt, setShowDetailsPrompt] = useState(false);
  const [showDetails2Prompt, setShowDetails2Prompt] = useState(false);

  const handleFormClick = () => {
    setShowFormPrompt(true);
  };

  const handleFormClosePrompt = () => {
    setShowFormPrompt(false);
  };

  const handleDetailsClick = (id) => {
    setDisplayStockId(id);
    getDisplayStockById(id);
    setShowDetailsPrompt(true);
  };

  const handleDetailsClosePrompt = () => {
    setShowDetailsPrompt(false);
  };

  const handleEditClick = () => {
    setStock({
      stockName: displayStock.stockName,
      supplier: displayStock.supplier,
      backhouseStock: displayStock.backhouseStock,
      backUoM: displayStock.backUoM,
      standardQuantity: displayStock.standardQuantity,
      displayStock: displayStock.displayStock,
      displayUoM: displayStock.displayUoM,
    });
    setShowEditPrompt(true);
  };

  const handleEditClosePrompt = () => {
    setShowEditPrompt(false);
  };

  const handleDetails2Click = (id) => {
    setDisplayStockItemId(id);
    getDisplayStockItemById(id);
    setShowDetails2Prompt(true);
  };

  const handleDetails2ClosePrompt = () => {
    setShowDetails2Prompt(false);
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Repacked Products Stock</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-between'>
            <div className='flex justify-between'>
              <button onClick={handleFormClick} className='px-[1vw] py-[0.8vh] text-[0.8vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Add New Repacked Product Stock</button>
            </div>
            <input
              type="text"
              className='bg-white px-[1vw] py-[0.8vh] text-darkp text-[0.8vw] font-light outline-none w-4/12 rounded-xl border border-darkp placeholder:text-darkp2'
              placeholder="search for supplier"
            />
          </div>
          {/*Gidungag nlng pod nako sa table ang backhouse of display uom*/}
          <div className='w-full h-[72vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[20%] text-[0.7vw] leading-tight text-center'>Stock Name</h1>
              <h1 className='w-[20%] text-[0.7vw] leading-tight text-center'>Supplier</h1>
              <h1 className='w-[10%] text-[0.7vw] leading-tight text-center'>Backhouse Stock</h1>
              <h1 className='w-[10%] text-[0.7vw] leading-tight text-center'>Backhouse UoM</h1>
              <h1 className='w-[10%] text-[0.7vw] text-center'>Display Stock</h1>
              <h1 className='w-[10%] text-[0.7vw] leading-tight text-center'>Display UoM</h1>
              <h1 className='w-[10%] text-[0.7vw] leading-tight text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              {stocks
                .filter(stock => stock.productId === null)
                .map(stock => {
                const supplier = getSupplierForStock(stock.supplier);
                return (
                  <div key={stock.id} className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                    <h1 className='w-[20%] text-[0.7vw] text-center'>{stock.stockName}</h1>
                    <h1 className='w-[20%] text-[0.7vw] text-center'>{supplier.supplierName}</h1>
                    <h1 className='w-[10%] text-[0.7vw] text-center'>{stock.backhouseStock}</h1>
                    <h1 className='w-[10%] text-[0.7vw] text-center'>{stock.backUoM}</h1>
                    <h1 className='w-[10%] text-[0.7vw] text-center'>{stock.displayStock}</h1>
                    <h1 className='w-[10%] text-[0.7vw] text-center'>{stock.displayUoM}</h1>
                    <h1 className='w-[10%] flex gap-[1vw] justify-center'>  
                      <button>
                        <img
                          src={info}
                          alt='delete'
                          className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                          onClick={() => handleDetailsClick(stock.id)}
                        />
                      </button>
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Prompt (Modal) */}
          {showFormPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[50vw] h-min p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>Add Repacked Product Stock</h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Stock Name</label>
                      <input name='stockName' value={stock.stockName} onChange={handleChange} type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter name' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Supplier</label>
                      <select
                        name="supplier"
                        value={stock.supplier}
                        onChange={handleChange}
                        className={`w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]`}
                        placeholder="enter name*"
                      >
                        <option>-Choose Supplier-</option>
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
                      <label className='text-[0.7vw]'>Standard Quantity</label>
                      <input name='standardQuantity' value={stock.standardQuantity} onChange={handleChange} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Backhouse UoM</label>
                      <input name='backUoM' value={stock.backUoM} onChange={handleChange} type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter uom' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Display UoM</label>
                      <input name='displayUoM' value={stock.displayUoM} onChange={handleChange} type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter uom' />
                    </div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-green-500 button'
                    onClick={handleSubmit}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white text-[0.7vw] rounded-lg hover:bg-red-500 button'
                    onClick={handleFormClosePrompt}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {showDetailsPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex'>
              <div className='bg-white w-full h-full p-[2vw] flex flex-col items-start gap-5'>
                <div className='w-full flex items-center'>
                  <div className='w-full flex justify-start'>
                    <div className='text-darkp w-full flex flex-col gap-5'>
                      <div className='flex gap-10 items-end'>
                        <h1 className='text-[3vw] font-bold tracking-tighter'>{displayStock.stockName}</h1>
                        <div className='flex gap-3 h-fit justify-end items-end pb-5'>
                          <button onClick={handleEditClick} className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Edit</button>
                          <button onClick={() => handleDelete(displayStock.id)} className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Delete</button>
                        </div>
                      </div>
                      <div className='w-full flex gap-10'>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Backhouse UoM:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{displayStock.backUoM}</h1>
                          </div>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Backhouse Stock:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{displayStock.backhouseStock}</h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Display UoM:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{displayStock.displayUoM}</h1>
                          </div>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Display Stock:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{displayStock.displayStock}</h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Standard Quantity:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>{displayStock.standardQuantity}</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleDetailsClosePrompt} className='h-full pt-5 flex items-start'><img src={exit} className='w-[1.8vw] h-[1.8vw]' /></button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <div className='w-full flex justify-between items-end'>
                    <h1 className='text-[1vw] text-darkp font-bold tracking-tighter'>Items Ordered:</h1>
                  </div>
                  <div className='w-full h-[64vh] flex flex-col drop-shadow'>
                    <div className='h-[6vh] bg-darkp opacity-80 border border-darkp rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
                      <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Reference #</h1>
                      <h1 className='w-[12%] text-[0.7vw] text-center'>Closed Stock</h1>
                      <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Open Stock</h1>
                      <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Amount Disparity</h1>
                      <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Stocked Out</h1>
                      <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Expiry Date</h1>
                      <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Actions</h1>
                    </div>
                    <div className='w-full h-full bg-white border-x rounded-b-2xl border-b border-darkp overflow-auto'>
                    {stockItems
                      .filter(stockItem => stockItem.stockID === displayStockId)
                      .map(stockItem => {
                        return (
                          <div key={stockItem.id} className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                            <h1 className='w-[11%] text-[0.7vw] text-center'>{stockItem.referenceNumber}</h1>
                            <h1 className='w-[12%] text-[0.7vw] text-center'>{stockItem.closedStock}</h1>
                            <h1 className='w-[12%] text-[0.7vw] text-center'>{stockItem.openStock}</h1>
                            <h1 className='w-[12%] text-[0.7vw] text-center'>{stockItem.damagedStock}</h1>
                            <h1 className='w-[12%] text-[0.7vw] text-center'>{stockItem.stockedOutQty}</h1>
                            <h1 className='w-[12%] text-[0.7vw] text-center'>{stockItem.expiryDate}</h1>
                            <h1 className='w-[12%] flex gap-[1vw] justify-center'>  
                              <button>
                                <img
                                  src={info}
                                  alt='delete'
                                  className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                                  onClick={() => handleDetails2Click(stockItem.id)}
                                />
                              </button>
                            </h1>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showEditPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-max h-min p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1.3vw] font-black'>
                  {displayStock.stockName}
                </h2>
                {/* Input for adding stock */}
                <div className='w-full flex gap-5'>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Stock Name</label>
                      <input name='stockName' value={stock.stockName} onChange={handleChange} type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter stock name' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Standard Quantity</label>
                      <input name='standardQuantity' value={stock.standardQuantity} onChange={handleChange} type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter stock name' />
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-5'>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Backhouse UoM</label>
                      <input name='backUoM' value={stock.backUoM} onChange={handleChange} type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter uom' />
                    </div>
                    <div className='w-full flex flex-col justify-start gap-1'>
                      <label className='text-[0.7vw]'>Display UoM</label>
                      <input name='displayUoM' value={stock.displayUoM} onChange={handleChange} type='text' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter uom' />
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
                    onClick={handleEditClosePrompt}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {showDetails2Prompt && (
            <div className='fixed top-0 left-0 w-full h-full flex'>
              <div className='bg-white w-full h-full p-[2vw] flex flex-col items-start gap-5'>
                <div className='w-full flex items-center'>
                  <div className='w-full flex justify-start'>
                    <div className='text-darkp w-full flex flex-col gap-5'>
                      <div className='flex gap-10 items-end'>
                        <h1 className='text-[3vw] font-bold tracking-tighter'>{displayStock.stockName} - {displayStockItem.referenceNumber}</h1>
                        <div className='flex gap-3 h-fit justify-end items-end pb-5'>
                          <button onClick={handleEditClick} className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Edit</button>
                          <button onClick={() => handleDelete(displayStock.id)} className='px-[2vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Delete</button>
                        </div>
                      </div>
                      <div className='w-full flex gap-10'>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Closed Stock:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>rawr</h1>
                          </div>
                          
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Open Stock:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>rawr</h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Expiry Date:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>rawr</h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleDetails2ClosePrompt} className='h-full pt-5 flex items-start'><img src={exit} className='w-[1.8vw] h-[1.8vw]' /></button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <div className='w-full flex justify-between items-end'>
                    <h1 className='text-[1vw] text-darkp font-bold tracking-tighter'>Items Ordered:</h1>
                  </div>
                  <div className='w-full h-[64vh] flex flex-col drop-shadow'>
                    <div className='h-[6vh] bg-darkp opacity-80 border border-darkp rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
                      <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Product Name</h1>
                      <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Displayed</h1>
                      <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Stocked Out</h1>
                      <h1 className='w-[12%] text-[0.7vw] leading-tight text-center'>Expiry Date</h1>
                    </div>
                    <div className='w-full h-full bg-white border-x rounded-b-2xl border-b border-darkp overflow-auto'>
                    {stockItems
                      .filter(stockItem => stockItem.stockID === displayStockId)
                      .map(stockItem => {
                        return (
                          <div key={stock.id} className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>
                            <h1 className='w-[11%] text-[0.7vw] text-center'>{stockItem.referenceNumber}</h1>
                            <h1 className='w-[12%] text-[0.7vw] text-center'>{stockItem.closedStock}</h1>
                            <h1 className='w-[12%] text-[0.7vw] text-center'>{stockItem.openStock}</h1>
                            <h1 className='w-[12%] text-[0.7vw] text-center'>06/05/2024</h1>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default rp;