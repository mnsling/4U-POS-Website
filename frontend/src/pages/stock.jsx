import React, { useState, useEffect } from 'react';
import bg from '../assets/bg.jpg';
import Sidebar from '../components/sidebar';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
import convert from '../assets/loop.png'
import axios from 'axios';

const stock = () => {

  const [stocks, setStocks] = useState([]);
  const [stock, setStock] = useState({
    productId: '',
    backhouseStock: 0,
    backUoM: '',
    displayStock: 0,
    displayUoM: '',
    conversionRate: '',
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchStocks();
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

  const getProductForStock = (stockId) => {
    const stock = stocks.find(s => s.id === stockId);
    if (stock) {
      return products.find(p => p.id === stock.productId) || { name: 'Unknown Product' };
    }
    return { name: 'Unknown Stock' };
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
      productId: stock.productId,
      backhouseStock: 0,
      backUoM: stock.backUoM,
      displayStock: 0,
      displayUoMUoM: stock.displayUoM,
      conversionRate: stock.conversionRate,
    })
      .then(response => {
        console.log('Stock created:', response.data);
        setStock({
          productId: '',
          backhouseStock: 0,
          backUoM: '',
          displayStock: 0,
          displayUoM: '',
          conversionRate: '',
        })
        fetchStocks();
      })
      .catch(error => {
        console.error('Error creating stock:', error.response.data);
      });
  };

  const handleDelete = (stockId) => {
    axios.delete(`http://127.0.0.1:8000/stock/${stockId}/`)
      .then(response => {
        console.log('Stock deleted:', response.data);
        fetchStocks();
      })
      .catch(error => {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
      });
  };

  const [upStockId, setUpStockId] = useState([]);

  const handleUpdatePass = (upStock) => {
    setStock({
      productId: upStock.productId,
      backhouseStock: upStock.backhouseStock,
      backUoM: upStock.backUoM,
      displayStock: upStock.displayStock,
      displayUoM: upStock.displayUoM,
      conversionRate: upStock.conversionRate,
    })
    setUpStockId(upStock.id)
    setShowConfirmButton(false)
    console.log(stock)
    console.log(upStockId)
  };

  const handleUpdate = () => {
    // Send POST request
    axios.put(`http://127.0.0.1:8000/stock/${upStockId}/`, {
      productId: stock.productId,
      backhouseStock: stock.backhouseStock,
      backUoM: stock.backUoM,
      displayStock: stock.displayStock,
      displayUoM: stock.displayUoM,
      conversionRate: stock.conversionRate,
    })
      .then(response => {
        console.log('Product created:', response.data);
        setStock({
          productId: '',
          backhouseStock: 0,
          backUoM: '',
          displayStock: 0,
          displayUoM: '',
          conversionRate: '',
        })
        setShowConfirmButton(true)
        setUpStockId();
        fetchStocks();
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  const [showConfirmButton, setShowConfirmButton] = useState(true);

  const [showPrompt, setShowPrompt] = useState(false);

  const handleConvertClick = () => {
    setShowPrompt(true);
  };

  const handleCloseConvertPrompt = () => {
    setShowPrompt(false);
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Product Stock</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-end'>
            <input
              type="text"
              className='bg-white px-[1vw] py-[0.8vh] text-darkp text-[0.8vw] font-light outline-none w-4/12 rounded-xl border border-darkp placeholder:text-darkp2'
              placeholder="search for supplier"
            />
          </div>
          <div className='w-full h-[60vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[14%] text-[0.7vw] leading-tight text-center'>Product</h1>
              <h1 className='w-[14%] text-[0.7vw] leading-tight text-center'>Backhouse Stock</h1>
              <h1 className='w-[14%] text-[0.7vw] leading-tight text-center'>Backhouse UoM</h1>
              <h1 className='w-[14%] text-[0.7vw] text-center'>Display Stock</h1>
              <h1 className='w-[14%] text-[0.7vw] leading-tight text-center'>Display UoM</h1>
              <h1 className='w-[14%] text-[0.7vw] leading-tight text-center'>Conversion Rate</h1>
              <h1 className='w-[14%] text-[0.7vw] leading-tight text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              <div className='h-[9%] flex flex-col items-center justify-between'>
              {stocks.map(stock => {
                  const product = getProductForStock(stock.id);
                  return (
                    <div key={stock.id} className='w-full border-b border-darkp text-darkp text-center flex items-center justify-between px-10 py-2'>
                      <h1 className='w-[14%] text-[0.7vw] text-center'>{product.name}</h1>
                      <h1 className='w-[14%] text-[0.7vw] text-center'>{stock.backhouseStock}</h1>
                      <h1 className='w-[14%] text-[0.7vw] text-center'>{stock.backUoM}</h1>
                      <h1 className='w-[14%] text-[0.7vw] text-center'>{stock.displayStock}</h1>
                      <h1 className='w-[14%] text-[0.7vw] text-center'>{stock.displayUoM}</h1>
                      <h1 className='w-[14%] text-[0.7vw] text-center'>{stock.conversionRate}</h1>
                      <h1 className='w-[14%] flex gap-[1vw] justify-center'>
                        <button onClick={() => handleUpdatePass(stock)}><img src={edit} alt="Edit" className='w-[1.5vw]' /></button>
                        <button onClick={() => handleDelete(stock.id)}><img src={del} alt="Delete" className='w-[1.5vw]' /></button>
                        <button onClick={handleConvertClick}><img src={convert} alt="Convert" className='w-[1.5vw]' /></button>
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='w-full h-[14vh] bg-darkp opacity-80 flex items-center justify-start rounded-2xl px-[1vw] py-[1vh] drop-shadow'>
            <div className='w-full h-fit flex items-end justify-between'>
              <div className='flex justify-center items-center gap-5'>
                <div className='w-[30vw] flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Product</label>
                  <select
                    name="productId"
                    value={stock.productId}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter product id*"
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
                <div className='w-[30vw] flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Conversion Rate</label>
                  <input
                    type="number"
                    name="conversionRate"
                    value={stock.conversionRate}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter conversion rate*"
                  />
                </div>
              </div>
              <div className='w-[10vw] flex flex-col gap-5 justify-end'>
                <div className='w-full flex items-end justify-end'>
                  {showConfirmButton ? (
                    <button
                      onClick={handleSubmit}
                      className='w-full px-[1vw] py-[1vh] bg-white text-[0.7vw] border border-black rounded-xl text-black hover:bg-green-500 hover:border-white hover:text-white button'
                    >
                      Confirm
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      className='w-[48%] px-[1vw] py-[1vh] bg-white text-[1vw] border border-black rounded-xl text-black hover:bg-green-500 hover:border-white hover:text-white button'
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Prompt (Modal) */}
          {showPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-[20vw] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-[1vw] font-black'>Convert to Backhouse Stock</h2>
                {/* Input for adding stock */}
                <div className='w-full flex flex-col gap-2'>
                  <div className='w-full flex flex-col justify-start'>
                    <label className='text-sm'>Product</label>
                    <select className='w-full border border-darkp rounded-md px-5 py-1'>
                      <option>1.</option>
                    </select>
                  </div>
                  <div className='w-full flex flex-col justify-start'>
                    <label className='text-sm'>Quantity</label>
                    <input type='text' className='w-full border border-darkp rounded-md px-5 py-1' />
                  </div>
                </div>
                <div className='flex gap-4'>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500 button'
                    onClick={handleCloseConvertPrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-red-500 button'
                    onClick={handleCloseConvertPrompt}
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
  );
};

export default stock;