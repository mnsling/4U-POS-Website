import React, { useState, useEffect } from 'react';
import bg from '../assets/bg.jpg';
import Sidebar from '../components/sidebar';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
import axios from 'axios';

const sinventory = () => {

  const [stocks, setStocks] = useState([]);
  const [repackedProducts, setRepackedProducts] = useState([]);
  const [repackedProduct, setRepackedProduct] = useState({
    name: '',
    stock: '',
    barcodeNo: '',
    category: '',
    unitWeight: '',
    unitPrice: '',
    wsmq: '',
    wsp: '',
    reorderLevel: '',
  });

  const [upProductId, setUpProductId] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRepackedProduct(prevProduct => {
      const updatedProduct = {
        ...prevProduct,
        [name]: value,
      };
      // Log updated product here
      console.log('Updated product:', updatedProduct);
      return updatedProduct;
    });
  };

  const fetchRepackedProducts = () => {
    axios.get('http://127.0.0.1:8000/repackedProduct/')
      .then(response => {
        setRepackedProducts(response.data);
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

  useEffect(() => {
    fetchRepackedProducts();
    fetchStocks();
  }, []);

  const getStockForProduct = (stockId) => {
    const stock = stocks.find(stock => stock.id === stockId);
    return stock || { backhouseStock: 0, displayStock: 0 };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request
    axios.post('http://127.0.0.1:8000/repackedProduct/', {
      name: repackedProduct.name,
      barcodeNo: repackedProduct.barcodeNo,
      category: repackedProduct.category,
      displayedStock: 0,
      stock: repackedProduct.stock,
      unitWeight: repackedProduct.unitWeight,
      unitPrice: parseFloat(repackedProduct.unitPrice),
      wsmq: parseInt(repackedProduct.wsmq),
      wsp: parseFloat(repackedProduct.wsp),
      reorderLevel: parseInt(repackedProduct.reorderLevel)
    })
      .then(response => {
        console.log('Product created:', response.data);
        setRepackedProduct({
          name: '',
          stock: '',
          barcodeNo: '',
          category: '',
          unitWeight: '',
          unitPrice: '',
          wsmq: '',
          wsp: '',
          reorderLevel: '',
        })
        fetchRepackedProducts();
        fetchStocks();
      })
      .catch(error => {
        console.error('Error creating product:', error.response.data);
      });
  };

  const handleDelete = (productId) => {
    axios.delete(`http://127.0.0.1:8000/repackedProduct/${productId}/`)
      .then(response => {
        console.log('Product deleted:', response.data);
        fetchRepackedProducts();
        fetchStocks();
      })
      .catch(error => {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
      });
  };

  const handleUpdatePass = (upProduct) => {
    setRepackedProduct({
      name: upProduct.name,
      barcodeNo: upProduct.barcodeNo,
      category: upProduct.category,
      stock: upProduct.stock,
      unitWeight: upProduct.unitWeight,
      unitPrice: upProduct.unitPrice,
      wsmq: upProduct.wsmq,
      wsp: upProduct.wsp,
      reorderLevel: upProduct.reorderLevel,
    })
    setUpProductId(upProduct.id)
    setShowConfirmButton(false)
    console.log(upProductId)
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    // Send POST request
    axios.put(`http://127.0.0.1:8000/repackedProduct/${upProductId}/`, {
      name: repackedProduct.name,
      barcodeNo: repackedProduct.barcodeNo,
      category: repackedProduct.category,
      stock: repackedProduct.stock,
      unitWeight: repackedProduct.unitWeight,
      unitPrice: parseFloat(repackedProduct.unitPrice),
      wsmq: parseInt(repackedProduct.wsmq),
      wsp: parseFloat(repackedProduct.wsp),
      reorderLevel: parseInt(repackedProduct.reorderLevel)
    })
      .then(response => {
        console.log('Product created:', response.data);
        setRepackedProduct({
          name: '',
          stock: '',
          barcodeNo: '',
          category: '',
          unitWeight: '',
          unitPrice: '',
          wsmq: '',
          wsp: '',
          reorderLevel: '',
        })
        fetchRepackedProducts();
        fetchStocks();
        setShowConfirmButton(true);
      })
      .catch(error => {
        console.error('Error creating product:', error.response.data);
      });
  };

  const [showConfirmButton, setShowConfirmButton] = useState(true);

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Repacked Products Inventory</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-between'>
            <div className='w-[15.5vw] flex justify-between'>
              <button className='px-[1vw] py-[0.8vh] text-[0.8vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>All</button>
              <button className='px-[1vw] py-[0.8vh] text-[0.8vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>No Stock</button>
              <button className='px-[1vw] py-[0.8vh] text-[0.8vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Low Stock</button>
            </div>
            <input
              type="text"
              className='bg-white px-[1vw] py-[0.8vh] text-darkp text-[0.8vw] font-light outline-none w-4/12 rounded-xl border border-darkp placeholder:text-darkp2'
              placeholder="search for products"
            />
          </div>
          <div className='w-full h-[45vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-3'>
              <h1 className='w-[9%] text-[0.7vw] leading-tight text-center'>Barcode #</h1>
              <h1 className='w-[9%] text-[0.7vw] leading-tight text-center'>Product Name</h1>
              <h1 className='w-[9%] text-[0.7vw] text-center'>Category</h1>
              <h1 className='w-[9%] text-[0.7vw] text-center'>Mother Stock</h1>
              <h1 className='w-[9%] text-[0.7vw] leading-tight text-center'>Display Stock</h1>
              <h1 className='w-[9%] text-[0.7vw] text-center'>Unit Weight</h1>
              <h1 className='w-[9%] text-[0.7vw] leading-tight text-center'>Unit Price</h1>
              <h1 className='w-[9%] text-[0.7vw] text-center'>WSMQ</h1>
              <h1 className='w-[9%] text-[0.7vw] text-center'>WSP</h1>
              <h1 className='w-[9%] text-[0.7vw] text-center'>Restock Level</h1>
              <h1 className='w-[9%] text-[0.7vw] text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              {repackedProducts.map(repackedProduct => {
                const stock = getStockForProduct(repackedProduct.stock);
                return (
                  <div key={repackedProduct.id} className='h-[9%] py-6 border-b border-darkp flex items-center justify-between px-3'>
                    <h1 className='w-[9%] text-[0.7vw] text-center'>{repackedProduct.barcodeNo}</h1>
                    <h1 className='w-[9%] text-[0.7vw] text-center'>{repackedProduct.name}</h1>
                    <h1 className='w-[9%] text-[0.7vw] text-center'>{repackedProduct.category_label}</h1>
                    <h1 className='w-[9%] text-[0.7vw] text-center'>{stock.stockName}</h1>
                    <h1 className='w-[9%] text-[0.7vw] text-center'>{repackedProduct.displayedStock}</h1>
                    <h1 className='w-[9%] text-[0.7vw] text-center'>{repackedProduct.unitWeight}</h1>
                    <h1 className='w-[9%] text-[0.7vw] text-center'>{repackedProduct.unitPrice}</h1>
                    <h1 className='w-[9%] text-[0.7vw] text-center'>{repackedProduct.wsmq}</h1>
                    <h1 className='w-[9%] text-[0.7vw] text-center'>{repackedProduct.wsp}</h1>
                    <h1 className='w-[9%] text-[0.7vw] text-center'>{repackedProduct.reorderLevel}</h1>
                    <div className='w-[9%] flex justify-center gap-5'>
                      <img
                        src={edit}
                        alt='edit'
                        onClick={() => handleUpdatePass(repackedProduct)}
                        className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                      />
                      <img
                        src={del}
                        alt='delete'
                        onClick={() => handleDelete(repackedProduct.id)}
                        className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                      />
                    </div>  
                  </div>
                );
              })}
            </div>
          </div>
          <div className='w-full h-[30vh] bg-darkp opacity-80 flex items-center justify-center rounded-2xl px-[1vw] py-[1vh] drop-shadow'>
            <div className='h-fit flex gap-5 justify-between'>
              <div className='w-[25vw] flex flex-col gap-5'>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Barcode #</label>
                  <input
                    type="text"
                    name="barcodeNo"
                    value={repackedProduct.barcodeNo}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter barcode*"
                  />
                </div>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={repackedProduct.name}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter product name*"
                  />
                </div>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Category</label>
                  <select
                    name="category"
                    value={repackedProduct.category}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                  >
                    <option value="">-Choose Category-</option>
                    <option value="MISC">Miscellaneous</option>
                    <option value="STATIONERY">Stationery & Office Supplies</option>
                    <option value="SMOKING">Tobacco & Smoking Accessories</option>
                    <option value="HOUSE">Household Items</option>
                    <option value="HEALTH">Health & Beauty</option>
                    <option value="FROZEN">Frozen Foods</option>
                    <option value="REFRIDGERATED">Dairy & Refrigerated Items</option>
                    <option value="GROCERY">Grocery Items</option>
                    <option value="SNACKS">Snacks</option>
                    <option value="BEVERAGES">Beverages</option>
                  </select>
                </div>
              </div>
              <div className='w-[25vw] flex flex-col gap-5'>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Unit Weight</label>
                  <input
                    type="number"
                    name="unitWeight"
                    value={repackedProduct.unitWeight}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter WSP*"
                  />
                </div>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Unit Price</label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={repackedProduct.unitPrice}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter unit price*"
                  />
                </div>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Wholesale Minimum Quantity (WSMQ)</label>
                  <input
                    type="number"
                    name="wsmq"
                    value={repackedProduct.wsmq}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter WSMQ*"
                  />
                </div>
              </div>
              <div className='w-[25vw] flex flex-col justify-between'>
                <div className='flex flex-col gap-5'>
                  <div className='flex flex-col gap-[0.3vh]'>
                    <label className='text-white font-bold text-[0.6vw]'>Wholesale Price (WSP)</label>
                    <input
                      type="number"
                      name="wsp"
                      value={repackedProduct.wsp}
                      onChange={handleChange}
                      className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                      placeholder="enter WSP*"
                    />
                  </div>
                  <div className='flex flex-col gap-[0.5vh]'>
                    <label className='text-white font-bold text-[0.6vw]'>Mother Stock</label>
                    <select
                      name="stock"
                      value={repackedProduct.stock}
                      onChange={handleChange}
                      className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    >
                      <option value="">-Choose Stock-</option>
                      {stocks
                        .filter(stock => stock.productId === null)
                        .map(stock => {
                        return (
                          <option key={stock.id} value={stock.id}>
                            {stock.stockName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  
                </div>
                <div className='flex gap-3'>
                  <div className='w-full flex items-end justify-between'>
                    <div className='flex flex-col gap-[0.3vh] mt-1 w-[48%]'>
                      <label className='text-white font-bold text-[0.6vw]'>Reorder Level</label>
                      <input
                        type="number"
                        name="reorderLevel"
                        value={repackedProduct.reorderLevel}
                        onChange={handleChange}
                        className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                        placeholder="enter reorder level*"
                      />
                    </div>
                    {showConfirmButton ? (
                      <button
                        onClick={handleSubmit}
                        className='w-[48%] bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg button hover:bg-green-600 hover:text-white'
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default sinventory;