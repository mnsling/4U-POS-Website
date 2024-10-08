import React, { useState, useEffect } from 'react';
import bg from '../assets/bg.jpg';
import Sidebar from '../components/sidebar';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
// import axios from 'axios';

const suppliers = () => {
  const [stocks, setStocks] = useState([]);
  const [stock, setStock] = useState({
    productId: '',
    backhouseStock: '',
    displayStock: '',
    conversionRate: '',
  });

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
      console.log('Updated product:', updatedProduct);
      return updatedProduct;
    });
  };

  // const fetchProducts = () => {
  //   axios.get('http://127.0.0.1:8000/product/')
  //     .then(response => {
  //       setProducts(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // };

  // const fetchStocks = () => {
  //   axios.get('http://127.0.0.1:8000/stock/')
  //     .then(response => {
  //       setStocks(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request
    // axios.post('http://127.0.0.1:8000/product/', {
    //   name: product.name,
    //   barcodeNo: product.barcodeNo,
    //   category: product.category,
    //   unitPrice: parseFloat(product.unitPrice),
    //   wsmq: parseInt(product.wsmq),
    //   wsp: parseFloat(product.wsp),
    //   reorderLevel: parseInt(product.reorderLevel),
    // })
    //   .then(response => {
    //     console.log('Product created:', response.data);
    //     setProduct({
    //       name: '',
    //       barcodeNo: '',
    //       category: '',
    //       unitPrice: '',
    //       wsmq: '',
    //       wsp: '',
    //       reorderLevel: '',
    //     });
    //     fetchProducts();
    //     fetchStocks();
    //   })
    //   .catch(error => {
    //     console.error('Error creating product:', error);
    //   });
  };

  const handleDelete = (productId) => {
    // axios.delete(`http://127.0.0.1:8000/product/${productId}/`)
    //   .then(response => {
    //     console.log('Product deleted:', response.data);
    //     fetchProducts();
    //     fetchStocks();
    //   })
    //   .catch(error => {
    //     console.error('Error deleting product:', error.response ? error.response.data : error.message);
    //   });
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
    });
    setUpProductId(upProduct.id);
    setShowConfirmButton(false);
    console.log(product);
    console.log(upProductId);
  };

  const handleUpdate = () => {
    // Send PUT request
    // axios.put(`http://127.0.0.1:8000/product/${upProductId}/`, {
    //   name: product.name,
    //   barcodeNo: product.barcodeNo,
    //   category: product.category,
    //   unitPrice: parseFloat(product.unitPrice),
    //   wsmq: parseInt(product.wsmq),
    //   wsp: parseFloat(product.wsp),
    //   reorderLevel: parseInt(product.reorderLevel),
    // })
    //   .then(response => {
    //     console.log('Product updated:', response.data);
    //     setProduct({
    //       name: '',
    //       barcodeNo: '',
    //       category: '',
    //       unitPrice: '',
    //       wsmq: '',
    //       wsp: '',
    //       reorderLevel: '',
    //     });
    //     setShowConfirmButton(true);
    //     setUpProductId();
    //     fetchProducts();
    //     fetchStocks();
    //   })
    //   .catch(error => {
    //     console.error('Error updating product:', error);
    //   });
  };

  useEffect(() => {
    // fetchProducts();
    // fetchStocks();
  }, []);

  const [showPrompt, setShowPrompt] = useState(false);
  const [showPrompt2, setShowPrompt2] = useState(false);

  const handleAddStockClick = () => {
    setShowPrompt(true);
  };

  const handleClosePrompt = () => {
    setShowPrompt(false);
  };

  const handleConvertClick = () => {
    setShowPrompt2(true);
  };

  const handleCloseConvertPrompt = () => {
    setShowPrompt2(false);
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
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Suppliers</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-end'>
            <input
              type="text"
              className='bg-white px-[1vw] py-[0.8vh] text-darkp text-[0.8vw] font-light outline-none w-4/12 rounded-xl border border-darkp placeholder:text-darkp2'
              placeholder="search for supplier"
            />
          </div>
          <div className='w-full h-[52vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Name</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Cellphone #</h1>
              <h1 className='w-[8vw] text-[0.7vw] text-center'>Telephone #</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Email</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Point Person</h1>
              <h1 className='w-[8vw] text-[0.7vw] leading-tight text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
              <div className='h-[9%] py-5 border-b border-darkp flex items-center justify-between px-10'>

                {/*replace the value for suppliers */}

                <h1 className='w-[8vw] text-[0.7vw] text-center'>Greenleaf Supply Co.</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>(082) 234-5678</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>+63 912 345 6789</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>sales@greenleafsupply.ph</h1>
                <h1 className='w-[8vw] text-[0.7vw] text-center'>John Doe</h1>
                <div className='w-[8vw] flex justify-center gap-5'>
                  <img
                    src={edit}
                    alt='edit'
                    className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                  />
                  <img
                    src={del}
                    alt='delete'
                    className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-[22vh] bg-darkp opacity-80 flex items-center justify-center rounded-2xl px-[1vw] py-[1vh] drop-shadow'>
            <div className='h-fit flex gap-5 justify-between'>
              <div className='w-[25vw] flex flex-col gap-5'>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Supplier Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter supplier name*"
                  />
                </div>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Cellphone #</label>
                  <input
                    type="text"
                    name="cell"
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter cellphone no.*"
                  />
                </div>
              </div>
              <div className='w-[25vw] flex flex-col gap-5'>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Telephone #</label>
                  <input
                    type="text"
                    name="tel"
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter telephone no.*"
                  />
                </div>
                <div className='flex flex-col gap-[0.5vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter email address*"
                  />
                </div>
              </div>
              <div className='w-[25vw] flex flex-col justify-between'>
                <div className='flex flex-col gap-[0.3vh]'>
                  <label className='text-white font-bold text-[0.6vw]'>Point Person</label>
                  <input
                    type="text"
                    name="point"
                    onChange={handleChange}
                    className={`bg-white px-[1vw] py-[1vh] text-[0.66vw] border outline-none rounded-lg`}
                    placeholder="enter point person*"
                  />
                </div>
                <div className='w-full flex items-end justify-end'>
                  {showConfirmButton ? (
                    <button
                      onClick={handleSubmit}
                      className='w-[48%] px-[1vw] py-[1vh] bg-white text-[0.7vw] border border-black rounded-xl text-black hover:bg-green-500 hover:border-white hover:text-white button'
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
  );
};

export default suppliers;
