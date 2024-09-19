import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/sidebar';
import data from '../components/data';
import bg from '../assets/bg.jpg';

const Scanner = () => {
  const [quantity, setQuantity] = useState('');
  const [showProductList, setShowProductList] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [addedProducts, setAddedProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    amountPaid: '',
    change: 0,
  });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    const calculateTotalCost = () => {
      const total = addedProducts.reduce((sum, product) => sum + (product.unitPrice * product.quantity), 0);
      setTotalCost(total);
    };

    calculateTotalCost();
  }, [addedProducts]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [addedProducts]);

  const handleNumberClick = (number) => {
    setQuantity(prev => (parseInt(prev + number) > 0 ? prev + number : ''));
  };

  const handleClear = () => {
    setQuantity('');
  };

  const handleSearchProducts = () => {
    setShowProductList(true);
  };

  const handleCloseProductList = () => {
    setShowProductList(false);
    setSelectedProduct(null);
    setSearchTerm('');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setQuantity(product.quantity.toString()); // Set quantity to selected product's quantity
  };

  const handleAddProduct = () => {
    if (selectedProduct) {
      const existingProduct = addedProducts.find(product => product.id === selectedProduct.id);
      let updatedProducts;

      if (existingProduct) {
        updatedProducts = addedProducts.map(product =>
          product.id === selectedProduct.id
            ? { ...product, quantity: product.quantity + parseInt(quantity, 10) }
            : product
        );
      } else {
        updatedProducts = [...addedProducts, { ...selectedProduct, quantity: parseInt(quantity, 10) || 1 }];
      }

      setAddedProducts(updatedProducts);
      setQuantity('');
      setShowProductList(false); // Close product list after adding
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value, 10) > 0 && !isNaN(parseInt(value, 10)))) {
      setQuantity(value);
    }
  };

  const handlePaymentButtonClick = () => {
    setPaymentDetails({
      amountPaid: '',
      change: 0,
    });
    setShowPaymentModal(true);
    setPaymentConfirmed(false);
  };

  const handleConfirmPayment = () => {
    const amountPaid = parseFloat(paymentDetails.amountPaid) || 0;
    const change = amountPaid - totalCost;
    if (amountPaid >= totalCost) {
      setPaymentDetails({ ...paymentDetails, change });
      setPaymentConfirmed(true);
    } else {
      alert("Amount paid is less than the total cost.");
    }
  };

  const handleCancelPayment = () => {
    setShowPaymentModal(false);
  };

  const handlePaymentAmountChange = (e) => {
    setPaymentDetails({ ...paymentDetails, amountPaid: e.target.value });
  };

  const handleExitPayment = () => {
    setShowPaymentModal(false);
    setAddedProducts([]);
    setPaymentDetails({
      amountPaid: '',
      change: 0,
    });
  };

  const filteredProducts = data.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='flex flex-col gap-10 w-10/12 h-full'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-10 drop-shadow-xl z-10'>
          <h1 className='text-2xl text-darkp font-medium tracking-tighter'>Point of Sale System</h1>
        </div>
        <div className='w-full h-full flex'>
          <div className='flex flex-col gap-8 w-8/12 h-full'>
            <div className='flex w-full h-3/4'>
              <div className='w-full h-full bg-white rounded-2xl mx-10 drop-shadow-xl'>
                <div className='flex gap-5 justify-between items-center text-white text-sm h-10 w-full px-10 py-6 bg-darkp opacity-80 rounded-t-2xl'>
                  <h1 className='w-2/12 text-center'>Quantity</h1>
                  <h1 className='w-3/12 text-center'>Unit of Measurement</h1>
                  <h1 className='w-3/12 text-center'>Product Name</h1>
                  <h1 className='w-3/12 text-center'>Unit Price</h1>
                  <h1 className='w-3/12 text-center'>Amount</h1>
                </div>
                <div ref={listRef} className='h-[550px] mt-3 overflow-y-auto'>
                  {addedProducts.map((product, index) => (
                    <div key={index} className='flex gap-8 justify-between px-10 py-3 border-b border-gray-200'>
                      <span className='w-2/12 text-sm text-center'>{product.quantity}</span>
                      <span className='w-3/12 text-center text-sm'>{product.uom}</span>
                      <span className='w-3/12 text-sm text-center'>{product.name}</span>
                      <span className='w-3/12 text-center text-sm'>₱ {product.unitPrice.toFixed(2)}</span>
                      <span className='w-3/12 text-center text-sm'>₱ {(product.unitPrice * product.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='bg-darkp opacity-80 h-1/6 rounded-2xl mx-10 px-10 flex flex-col justify-center gap-1 text-white drop-shadow-xl'>
              <div className='w-full flex justify-between'>
                <h1>Cost before discount:</h1>
                <h1>₱ {totalCost.toFixed(2)}</h1>
              </div>
              <div className='w-full flex justify-between'>
                <h1 className='text-2xl'>Total Amount:</h1>
                <h1 className='text-2xl'>₱ {totalCost.toFixed(2)}</h1>
              </div>
            </div>
          </div>
          <div className='w-1/3 h-full mr-10'>
            <div className='h-1/6 w-full bg-white drop-shadow-xl rounded-2xl'>
              <div className='w-full h-10 py-6 text-sm text-white bg-darkp flex opacity-80 items-center px-5 rounded-t-2xl'>
                Quantity:
              </div>
              <input
                type='number'
                min='1'
                className='h-4/6 w-full px-5 text-4xl text-darkp font-bold border-none outline-none rounded-b-2xl'
                placeholder='enter quantity'
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <div className='flex gap-2 w-full h-2/5 justify-between mt-5'>
              <div className='flex flex-col gap-2 justify-between w-full'>
                <button onClick={() => handleNumberClick('7')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>7</button>
                <button onClick={() => handleNumberClick('4')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>4</button>
                <button onClick={() => handleNumberClick('1')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>1</button>
              </div>
              <div className='flex flex-col gap-2 justify-between w-full'>
                <button onClick={() => handleNumberClick('8')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>8</button>
                <button onClick={() => handleNumberClick('5')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>5</button>
                <button onClick={() => handleNumberClick('2')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>2</button>
              </div>
              <div className='flex flex-col gap-2 justify-between w-full'>
                <button onClick={() => handleNumberClick('9')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>9</button>
                <button onClick={() => handleNumberClick('6')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>6</button>
                <button onClick={() => handleNumberClick('3')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>3</button>
              </div>
              <div className='flex flex-col gap-2 justify-between w-full'>
                <button onClick={handleClear} className='h-full rounded-2xl bg-white drop-shadow-xl text-md hover:bg-red-400 hover:text-white button'>CLEAR</button>
                <button className='h-full rounded-2xl bg-white drop-shadow-xl text-md hover:bg-green-400 hover:text-white button'>ENTER</button>
                <button className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>*</button>
                <button onClick={() => handleNumberClick('0')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>0</button>
              </div>
            </div>
            <div className='flex gap-1 mt-6'>
              <button
                onClick={handleSearchProducts}
                className='w-full h-28 bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button'
              >
                <h1 className='h-full text-sm font-medium flex justify-center items-center px-5'>Search P.</h1>
              </button>
              <button className='w-full h-28 bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button'>
                <h1 className='h-full text-sm font-medium flex justify-center items-center px-5'>Discount</h1>
              </button>
              <button className='w-full h-28 bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button'>
                <h1 className='h-full text-sm font-medium flex justify-center items-center px-5'>S. Charge</h1>
              </button>
              <button onClick={handlePaymentButtonClick} className='w-full h-28 bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button'>
                <h1 className='h-full w-full text-sm font-medium flex justify-center items-center px-5'>Payment</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showProductList && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20'>
          <div className='bg-white w-8/12 h-3/4 rounded-2xl drop-shadow-xl flex flex-col'>
            <div className='flex justify-between items-center py-6 pl-10 pr-14 bg-white text-black rounded-t-2xl w-full'>
              <h1 className='text-xl font-medium'>Products List</h1>
              <input
                type="text"
                className='px-4 py-2 text-darkp text-md font-light outline-none w-4/12 rounded-full border border-darkp placeholder:text-darkp2'
                placeholder="search for products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className='flex gap-3'>
                <button
                  onClick={handleAddProduct}
                  className='text-darkp border border-darkp rounded-lg px-4 py-2 hover:bg-darkp hover:text-white button'
                  disabled={!selectedProduct}
                >
                  Add
                </button>
                <button onClick={handleCloseProductList} className='text-darkp border border-darkp rounded-lg px-4 py-2 hover:bg-darkp hover:text-white button'>
                  Close
                </button>
              </div>
            </div>
            <div className='overflow-y-scroll px-10 mb-10'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='bg-darkp text-white sticky top-0'>
                    <th className='py-2 px-4'>Item Code</th>
                    <th className='py-2 px-4'>Product Name</th>
                    <th className='py-2 px-4'>Supplier</th>
                    <th className='py-2 px-4'>Wholesale Price</th>
                    <th className='py-2 px-4'>Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map(product => (
                    <tr
                      key={product.id}
                      className={`cursor-pointer ${selectedProduct?.id === product.id ? 'bg-darkp2 text-white' : 'hover:bg-gray-100'}`}
                      onClick={() => handleProductClick(product)}
                    >
                      <td className='py-2 px-4'>{product.itemCode}</td>
                      <td className='py-2 px-4'>{product.name}</td>
                      <td className='py-2 px-4'>{product.supplier}</td>
                      <td className='py-2 px-4'>₱ {product.wholesalePrice.toFixed(2)}</td>
                      <td className='py-2 px-4'>₱ {product.unitPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showPaymentModal && (
        <div className='fixed inset-0 w-full right-0 flex items-end justify-end'>
          <div className='bg-cover bg-center h-full w-full flex justify-end' style={{ backgroundImage: `url(${bg})` }}>
            <div className='w-10/12 px-10 py-24 flex flex-col gap-10 mt-4'>
              <h2 className='text-5xl text-left text-white bg-darkp opacity-80 rounded-2xl px-5 py-5 font-semibold tracking-tighter'>Payment Confirmation</h2>
              <div className='h-3/6 flex gap-5 items-start justify-center'>
                <div className='h-full flex flex-col gap-3'>
                  <div className='w-full h-full flex flex-col gap-5 justify-start items-start bg-white border-2 rounded-2xl opacity-70 px-10 py-5'>
                    <p className='text-3xl font-semibold tracking-tight'>Total Amount:</p>
                    <p className='text-6xl font-semibold tracking-tighter'>₱ {totalCost.toFixed(2)}</p>
                  </div>
                  <div className='w-full flex flex-col gap-2 justify-start items-start bg-white border-2 rounded-2xl px-10 py-5'>
                    <p className='text-3xl font-semibold tracking-tight'>Amount Paid:</p>
                    <div className='flex gap-2 text-6xl font-semibold items-center justify-start'>
                      <p>₱</p>
                      <input
                        type='number'
                        value={paymentDetails.amountPaid}
                        onChange={handlePaymentAmountChange}
                        className='w-full text-6xl leading-5 outline-none bg-transparent tracking-tight placeholder:tracking-tighter'
                        placeholder='enter amount'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-20 h-full w-full bg-white border-2 rounded-2xl px-10 py-5'>
                  <p className='text-3xl font-semibold tracking-tight'>Change:</p>
                  <p className='text-9xl font-semibold tracking-tighter'> ₱ {paymentDetails.change.toFixed(2)}</p>
                </div>
              </div>
              <div className='flex gap-5 justify-end'>
                {!paymentConfirmed ? (
                  <>
                    <button
                      onClick={handleConfirmPayment}
                      className='bg-darkp opacity-80 hover:opacity-100 button text-white text-lg tracking-tight px-4 py-2 rounded'
                    >
                      Proceed with Payment
                    </button>
                    <button
                      onClick={handleCancelPayment}
                      className='bg-darkp opacity-80 hover:opacity-100 button text-white text-lg tracking-tight px-4 py-2 rounded'
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleExitPayment}
                    className='bg-darkp opacity-80 hover:opacity-100 button text-white text-lg tracking-tight px-4 py-2 rounded'
                  >
                    Exit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;