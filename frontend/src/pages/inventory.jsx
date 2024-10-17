import React, { useState, useEffect } from 'react'
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'
import del from '../assets/delete.png'
import edit from '../assets/edit.png'
import axios from 'axios'

const Inventory = () => {

  const[stocks, setStocks] = useState([]);

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    barcodeNo: '',
    category: '',
    unitPrice: '',
    wsmq: '',
    wsp: '',
    reorderLevel: '',
  });

  const [upProductId, setUpProductId] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct(prevProduct => {
      const updatedProduct = {
        ...prevProduct,
        [name]: value,
      };
      // Log updated product here
      console.log('Updated product:', updatedProduct);
      return updatedProduct;
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request
    axios.post('http://127.0.0.1:8000/product/', {
      name: product.name,
      barcodeNo: product.barcodeNo,
      category: product.category,
      unitPrice: parseFloat(product.unitPrice),
      wsmq: parseInt(product.wsmq),
      wsp: parseFloat(product.wsp),
      reorderLevel: parseInt(product.reorderLevel),
    })
      .then(response => {
        console.log('Product created:', response.data);
        setProduct({
          name: '',
          barcodeNo: '',
          category: '',
          unitPrice: '',
          wsmq: '',
          wsp: '',
          reorderLevel: '',
        })
        fetchProducts();
        fetchStocks();
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  const handleDelete = (productId) => {
    axios.delete(`http://127.0.0.1:8000/product/${productId}/`)
      .then(response => {
        console.log('Product deleted:', response.data);
        fetchProducts();
        fetchStocks();
      })
      .catch(error => {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
      });
  };

  const [showConfirmButton, setShowConfirmButton] = useState(true);

  const handleUpdatePass = (upProduct) => {
    setProduct({
      name: upProduct.name,
      barcodeNo: upProduct.barcodeNo,
      category: upProduct.category,
      unitPrice: upProduct.unitPrice,
      wsmq: upProduct.wsmq,
      wsp: upProduct.wsp,
      reorderLevel: upProduct.reorderLevel,
    })
    setUpProductId(upProduct.id)
    setShowConfirmButton(false)
    console.log(product)
    console.log(upProductId)
  };

  const handleUpdate = () => {
    // Send POST request
    axios.put(`http://127.0.0.1:8000/product/${upProductId}/`, {
      name: product.name,
      barcodeNo: product.barcodeNo,
      category: product.category,
      unitPrice: parseFloat(product.unitPrice),
      wsmq: parseInt(product.wsmq),
      wsp: parseFloat(product.wsp),
      reorderLevel: parseInt(product.reorderLevel),
    })
      .then(response => {
        console.log('Product created:', response.data);
        setProduct({
          name: '',
          barcodeNo: '',
          category: '',
          unitPrice: '',
          wsmq: '',
          wsp: '',
          reorderLevel: '',
        })
        setShowConfirmButton(true)
        setUpProductId();
        fetchProducts();
        fetchStocks();
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  useEffect(() => {``
    fetchProducts();
    fetchStocks();
  }, []);

  const [showPrompt, setShowPrompt] = useState(false);

  const handleAddStockClick = () => {
    setShowPrompt(true);
  };

  const handleClosePrompt = () => {
    setShowPrompt(false);
  };

  const handleConvertClick = () => {
    setShowPrompt(true);
  };

  const handleCloseConvertPrompt = () => {
    setShowPrompt(false);
  };

  const getStockForProduct = (productId) => {
    const stock = stocks.find(stock => stock.productId === productId);
    return stock || { backhouseStock: 0, displayStock: 0 };
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Inventory</h1>
        </div>
        <div className='h-[90%] w-[95%] flex flex-col items-center'>
          <div className='w-full h-[2vw]' />
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
          <div className='w-full h-[1vw]' />
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
              {products.map(product => {
                  const stock = getStockForProduct(product.id);
                  return (
                    <div key={product.id} className='w-full text-darkp text-center flex items-center justify-between px-10 py-2 border-b border-gray-200'>
                      <h1 className='w-[8%] text-[0.8vw]'>{product.barcodeNo}</h1>
                      <h1 className='w-[8%] text-[0.8vw]'>{product.name}</h1>
                      <h1 className='w-[8%] text-[0.8vw]'>{product.category_label}</h1>
                      <h1 className='w-[8%] text-[0.8vw]'>{stock.backhouseStock}</h1>
                      <h1 className='w-[8%] text-[0.8vw]'>{stock.displayStock}</h1>
                      <h1 className='w-[8%] text-[0.8vw]'>{product.unitPrice}</h1>
                      <h1 className='w-[8%] text-[0.8vw]'>{product.wsmq}</h1>
                      <h1 className='w-[8%] text-[0.8vw]'>{product.wsp}</h1>
                      <h1 className='w-[8%] flex gap-[1vw] justify-center'>
                        <button onClick={() => handleUpdatePass(product)}><img src={edit} alt="Edit" className='w-[1.5vw]' /></button>
                        <button onClick={() => handleDelete(product.id)}><img src={del} alt="Delete" className='w-[1.5vw]' /></button>
                      </h1>
                    </div>
                  );
                })}
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
                    name="barcodeNo"
                    value={product.barcodeNo}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                    placeholder="enter barcode*"
                  />
                </div>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[1vw]'>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                    placeholder="enter product name*"
                  />
                </div>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[1vw]'>Category</label>
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                  >
                    <option value=""></option>
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
              <div className='w-[32%] flex flex-col gap-3'>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[1vw]'>Unit Price</label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={product.unitPrice}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                    placeholder="enter unit price*"
                  />
                </div>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[1vw]'>Wholesale Minimum Quantity (WSMQ)</label>
                  <input
                    type="number"
                    name="wsmq"
                    value={product.wsmq}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                    placeholder="enter WSMQ*"
                  />
                </div>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[1vw]'>Wholesale Price (WSP)</label>
                  <input
                    type="number"
                    name="wsp"
                    value={product.wsp}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                    placeholder="enter WSP*"
                  />
                </div>
              </div>
              <div className='w-[32%] flex flex-col justify-between gap-3'>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[1vw]'>Reorder Level</label>
                  <input
                    type="number"
                    name="reorderLevel"
                    value={product.reorderLevel}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[1vw] border outline-none text-xs rounded-lg`}
                    placeholder="enter reorder level*"
                  />
                </div>
                <div className='w-full flex items-end justify-between'>
                  <button onClick={handleAddStockClick} className='w-[48%] px-[1vw] py-[1vh] bg-white opacity-[80%] text-[0.7vw] border border-black rounded-xl text-black hover:opacity-100 button'>
                    Add Backhouse Stock
                  </button>
                  <button onClick={handleConvertClick} className='w-[48%] px-[1vw] py-[1vh] bg-white opacity-[80%] text-[0.7vw] border border-black rounded-xl text-black hover:opacity-100 button'>
                    Convert Backhouse Stock
                  </button>
                </div>
                <div className='w-full flex items-end justify-end'>
                {showConfirmButton ? (
                  <button
                    onClick={handleSubmit}
                    className='w-[48%] px-[1vw] py-[1vh] bg-white text-[1vw] border border-black rounded-xl text-black hover:bg-green-500 hover:border-white hover:text-white button'
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
              <div className='bg-white w-3/12 p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-lg font-medium'>Add Backhouse Stock</h2>
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
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500'
                    onClick={handleClosePrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-gray-300 text-darkp rounded-lg hover:bg-gray-400'
                    onClick={handleClosePrompt}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Prompt (Modal) */}
          {showPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white w-3/12 p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
                <h2 className='text-black text-lg font-medium'>Convert to Backhouse Stock</h2>
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
                    className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500'
                    onClick={handleClosePrompt}
                  >
                    Confirm
                  </button>
                  <button
                    className='px-[1vw] py-[1vh] bg-gray-300 text-darkp rounded-lg hover:bg-gray-400'
                    onClick={handleClosePrompt}
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

export default Inventory
