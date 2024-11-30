import React, { useState, useEffect } from 'react'
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'
import del from '../assets/delete.png'
import edit from '../assets/edit.png'
import axios from 'axios'

const Inventory = () => {

  const [stocks, setStocks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
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

  useEffect(() => {
    ``
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
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-between'>
            <div className='w-[15.5vw] flex gap-[2%]'>
              <button className='px-[1vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>All</button>
              <button className='px-[1vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>No Stock</button>
              <button className='px-[1vw] py-[0.8vh] text-[0.7vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white button'>Low Stock</button>
            </div>
            <input
              type="text"
              className='bg-white px-[1vw] text-darkp text-[0.7vw] font-light outline-none w-4/12 rounded-xl border border-darkp placeholder:text-darkp2'
              placeholder="search for products"
            />
          </div>
          <div className='w-full h-[45vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[6vw] text-[0.7vw] leading-tight text-center'>Barcode #</h1>
              <h1 className='w-[6vw] text-[0.7vw] leading-tight text-center'>Product Name</h1>
              <h1 className='w-[6vw] text-[0.7vw] text-center'>Category</h1>
              <h1 className='w-[6vw] text-[0.7vw] leading-tight text-center'>Backhouse Stock</h1>
              <h1 className='w-[6vw] text-[0.7vw] leading-tight text-center'>Display Stock</h1>
              <h1 className='w-[6vw] text-[0.7vw] leading-tight text-center'>Unit Price</h1>
              <h1 className='w-[6vw] text-[0.7vw] text-center'>WSMQ</h1>
              <h1 className='w-[6vw] text-[0.7vw] text-center'>WSP</h1>
              <h1 className='w-[6vw] text-[0.7vw] text-center'>Actions</h1>
            </div>
            <div className='w-full h-full flex flex-col'>
              <div className='w-full h-full bg-white rounded-b-2xl overflow-y-scroll hide-scrollbar'>
                {products.map(product => {
                  const stock = getStockForProduct(product.id);
                  return (
                    <div key={product.id} className='w-full text-darkp text-center flex items-center justify-between px-10 py-2 border-b border-gray-200'>
                      <h1 className='w-[6vw] text-[0.7vw] text-center'>{product.barcodeNo}</h1>
                      <h1 className='w-[6vw] text-[0.7vw] text-center'>{product.name}</h1>
                      <h1 className='w-[6vw] text-[0.7vw] text-center'>{product.category_label}</h1>
                      <h1 className='w-[6vw] text-[0.7vw] text-center'>{stock.backhouseStock}</h1>
                      <h1 className='w-[6vw] text-[0.7vw] text-center'>{stock.displayStock}</h1>
                      <h1 className='w-[6vw] text-[0.7vw] text-center'>{product.unitPrice}</h1>
                      <h1 className='w-[6vw] text-[0.7vw] text-center'>{product.wsmq}</h1>
                      <h1 className='w-[6vw] text-[0.7vw] text-center'>{product.wsp}</h1>
                      <h1 className='w-[6vw] flex gap-[1vw] justify-center'>
                        <button onClick={() => handleUpdatePass(product)}><img src={edit} alt="Edit" className='w-[0.8vw] h-[0.8vw]' /></button>
                        <button onClick={() => handleDelete(product.id)}><img src={del} alt="Delete" className='w-[0.8vw] h-[0.8vw]' /></button>
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='w-full h-[30vh] bg-darkp opacity-80 flex items-center justify-center rounded-2xl px-[1vw] py-[1vh] drop-shadow'>
            <div className='h-fit flex gap-5 justify-between'>
              <div className='w-[25vw] flex flex-col justify-between'>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Barcode #</label>
                  <input
                    type="text"
                    name="barcodeNo"
                    value={product.barcodeNo}
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
                    value={product.name}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter product name*"
                  />
                </div>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Category</label>
                  <select
                    name="category"
                    value={product.category}
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
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Unit Price</label>
                  <input
                    type="number"
                    name="unitPrice"
                    value={product.unitPrice}
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
                    value={product.wsmq}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter WSMQ*"
                  />
                </div>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Wholesale Price (WSP)</label>
                  <input
                    type="number"
                    name="wsp"
                    value={product.wsp}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter WSP*"
                  />
                </div>
              </div>
              <div className='w-[25vw] flex flex-col justify-between'>
                <div className='flex flex-col gap-[0.3vh] mt-1'>
                  <label className='text-white font-bold text-[0.6vw]'>Reorder Level</label>
                  <input
                    type="number"
                    name="reorderLevel"
                    value={product.reorderLevel}
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter reorder level*"
                  />
                </div>
                <div className='w-full flex items-end justify-end'>
                  {showConfirmButton ? (
                    <button
                      onClick={handleSubmit}
                      className={`bg-white px-[1vw] py-[1vh] text-[0.6vw] border outline-none rounded-lg hover:bg-green-500 hover:text-white button`}
                      >
                      Confirm
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdate}
                      className={`bg-white px-[1vw] py-[1vh] text-[0.6vw] border outline-none rounded-lg`}
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
  )
}

export default Inventory
