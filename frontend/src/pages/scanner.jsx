import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/sidebar';
import bg from '../assets/bg.jpg';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
import axios from 'axios';

const Scanner = () => {

  const [products, setProducts] = useState([]);
  const [repackedProducts, setRepackedProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  
  const [transaction, setTransaction] = useState({
    terminalIssued: 'ONE',
    status: 'ON HOLD',
    amountDue: 0,
    discountApplicable: false,
    finalAmount: 0,
    amountPaid: 0,
    customerChange: 0,
  });

  const [transactionItems, setTransactionItems] = useState([]);
  const [transactionItem, setTransactionItem] = useState({
    id: '',
    transactionID: '',
    barcodeNo: '',
    quantity: 0,
    price: 0,
  });

  const[startCashCount, setStartCashCount] = useState({
    beginningBalance: 0,
    terminalIssued: 'ONE',
  });

  const[endCashCount, setEndCashCount] = useState({
    terminalIssued: 'ONE',
    thousand: 0,
    fiveHundred: 0,
    twoHundred: 0,
    oneHundred: 0,
    fifty: 0,
    twenty: 0,
    ten: 0,
    five: 0,
    one: 0,
    twoFiveCent: 0,
    tenCent: 0,
    fiveCent: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTransactionItem(prevTransactionItem => {
      const updatedTransactionItem = {
        ...prevTransactionItem,
        [name]: value,
      };
      // Log updated product here
      console.log('Updated Transaction Item:', updatedTransactionItem);
      return updatedTransactionItem;
    });
  };

  const handleChangeTransaction = (e) => {
    const { name, value } = e.target;
  
    setTransaction((prevTransaction) => {
      const updatedTransaction = {
        ...prevTransaction,
        [name]: value,
      };
      
      return updatedTransaction;
    });
  };

  const handleChangeStartCount = (e) => {
    const { name, value } = e.target;

    setStartCashCount(prevStartCashCount => {
      const updatedStartCashCount = {
        ...prevStartCashCount,
        [name]: value,
      };
      // Log updated product here
      console.log('Updated Transaction Item:', updatedStartCashCount);
      return updatedStartCashCount;
    });
  };

  const handleChangeEndCount = (e) => {
    const { name, value } = e.target;

    setEndCashCount(prevEndCashCount => {
      const updatedEndCashCount = {
        ...prevEndCashCount,
        [name]: value,
      };
      // Log updated product here
      console.log('Updated Transaction Item:', updatedEndCashCount);
      return updatedEndCashCount;
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

  const fetchRepackedProducts = () => {
    axios.get('http://127.0.0.1:8000/repackedProduct/')
      .then(response => {
        setRepackedProducts(response.data);
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

  useEffect(() => {``
    fetchProducts();
    fetchRepackedProducts();
    fetchStocks();
  }, []);
  
  const handleAddProduct = () => {
    if (transactionItem.barcodeNo && transactionItem.quantity > 0) {
      setTransactionItems((prevItems) => [...prevItems, transactionItem]);
      console.log('Added Transaction Item:', transactionItem);
      setTransactionItem({
        id: '',
        transactionID: '',
        barcodeNo: '', 
        quantity: 0,
        price: 0,
      });
      console.log(transactionItems)
    } else {
      console.warn('Please select a product and enter a valid quantity before adding.');
    }
  };

  const handleDeleteProduct = (barcodeNo) => {
    setTransactionItems(prevItems => 
      prevItems.filter(item => item.barcodeNo !== barcodeNo)
    );
    console.log(`Deleted product with ID: ${barcodeNo}`);
  };

  const [newQuantity, setNewQuantity] = useState({
    qty: 0,
    productId: 0,
  });

  const handleEditQuantity = () => {
    console.log(newQuantity);

    const barcodeNo = newQuantity.barcodeNo;

    setTransactionItems(prevItems =>
      prevItems.map(item => 
        item.barcodeNo === barcodeNo ? { ...item, quantity: newQuantity.qty } : item
      )
    );

    console.log(`Updated quantity for product ID: ${productID} to ${newQuantity.qty}`);
  };

  const handleQuantityChange = (e) => {
    const { name, value } = e.target;

    setNewQuantity(prevQuantity => {
      const updatedQuantity = {
        ...prevQuantity,
        [name]: value,
      };
      // Log updated product here
      console.log('Updated Quantity:', updatedQuantity);
      return updatedQuantity;
    });
  };

  const postTransaction = () => {
    // Step 1: First, create the transaction to get the transactionID
    axios.post('http://127.0.0.1:8000/transaction/', {
      terminalIssued: 'ONE',
      status: 'COMPLETED',
      amountDue: totalAmountGlobal,
      discountApplicable: transaction.discountApplicable,
      finalAmount: finalAmountGlobal,
      amountPaid: transaction.amountPaid,
      customerChange: customerChange,
    })
    .then((transactionResponse) => {

      setTransaction({
        terminalIssued: 'ONE',
        status: 'ON HOLD',
        amountDue: 0,
        discountApplicable: false,
        finalAmount: 0,
        amountPaid: 0,
        customerChange: 0,
      })

      const transactionID = transactionResponse.data.id;
  
      const postRequests = transactionItems.map(item => {

        const product = getProduct(item.barcodeNo)
        const price = product.unitPrice;

        console.log(product);

        const stock = getStock(item)

        const unitMeasurement = stock.displayUoM;

        console.log(stock);

        return axios.post('http://127.0.0.1:8000/transactionItem/', {
          transactionID: transactionID,
          barcodeNo: item.barcodeNo,
          quantity: item.quantity,
          price: price,
          productTotal: item.productTotal,
          unitMeasurement: unitMeasurement,
        });
      });
  
      Promise.all(postRequests)
        .then((responses) => {
          responses.forEach(response => {
            console.log('Transaction item added:', response.data);
          });
        })
        .catch((error) => {
          console.error('Error posting transaction items:', error.response.data);
        });
    })
    .catch((error) => {
      // Handle error creating the transaction
      console.error('Error creating transaction:', error.response?.data || error.message);
    });

    clearTransactionItems();
    handleCancelPayment();
  };

  // Function to clear transactionItems array
  const clearTransactionItems = () => {
    setTransactionItems([]); // Reset the transactionItems to an empty array
  };
  
  const totalAmountGlobal = useMemo(() => {
    return transactionItems.reduce((total, item) => {
      let product = products.find((p) => String(p.barcodeNo) === String(item.barcodeNo));

      if (!product) {
        product = repackedProducts.find((p) => String(p.barcodeNo) === String(item.barcodeNo));
      }

      const unitPrice = product ? product.unitPrice : 0;
      return total + item.quantity * unitPrice;
    }, 0).toFixed(2); // Limiting to 2 decimal places
  }, [transactionItems, products]);
  
  const finalAmountGlobal = useMemo(() => {
    const amount = transaction.discountApplicable ? totalAmountGlobal * 0.85 : totalAmountGlobal;
    return parseFloat(amount).toFixed(2); // Limiting to 2 decimal places and converting back to number
  }, [totalAmountGlobal, transaction.discountApplicable]);  

  const customerChange = useMemo(() => {
    const change = transaction.amountPaid - finalAmountGlobal;
    return change.toFixed(2); // You can also add a condition here to ensure change is not negative
  }, [transaction.amountPaid, finalAmountGlobal]);

  const toggleDiscount = () => {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      discountApplicable: !prevTransaction.discountApplicable,
    }));
  };

  const getProduct = (barcode) => {
    let product = products.find(p => String(p.barcodeNo) === String(barcode))

    if (!product) {
      product = repackedProducts.find(p => String(p.barcodeNo) === String(barcode))
    }

    return product
  }

  const getStock = (item) => {
    const product = getProduct(item.barcodeNo)

    let stock = stocks.find((s) => String(s.productId) === String(product.id));

    if (!stock) {
      stock = stocks.find((s) => String(s.id) === String(product.stock));
    }

    return stock
  }

  const handleSubmitStartCash = (e) => {
    e.preventDefault();

    // Send POST request
    axios.post('http://127.0.0.1:8000/startCashCount/', {
      beginningBalance: startCashCount.beginningBalance,
      terminalIssued: 'ONE',
    })
      .then(response => {
        console.log('Product created:', response.data);
        setStartCashCount({
          beginningBalance: 0,
          terminalIssued: 'ONE',
        })
        handleBegClose();
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  const handleSubmitEndCash = (e) => {
    e.preventDefault();

    // Send POST request
    axios.post('http://127.0.0.1:8000/endCashCount/', {
      terminalIssued: 'ONE',
      thousand: endCashCount.thousand,
      fiveHundred: endCashCount.fiveHundred,
      twoHundred: endCashCount.twoHundred,
      oneHundred: endCashCount.oneHundred,
      fifty: endCashCount.fifty,
      twenty: endCashCount.twenty,
      ten: endCashCount.ten,
      five: endCashCount.five,
      one: endCashCount.one,
      twoFiveCent: endCashCount.twoFiveCent,
      tenCent: endCashCount.tenCent,
      fiveCent: endCashCount.fiveCent,
    })
      .then(response => {
        console.log('Product created:', response.data);
        setEndCashCount({
          terminalIssued: 'ONE',
          thousand: 0,
          fiveHundred: 0,
          twoHundred: 0,
          oneHundred: 0,
          fifty: 0,
          twenty: 0,
          ten: 0,
          five: 0,
          one: 0,
          twoFiveCent: 0,
          tenCent: 0,
          fiveCent: 0,
        })
        handleEndClose();
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  const [showProductList, setShowProductList] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBegBalModal, setShowBegBalModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  const handleNumberClick = (number) => {
    setTransactionItem((prevItem) => ({
      ...prevItem,
      quantity: Number(`${prevItem.quantity}${number}`)
    }));
  };
  
  const handleClear = () => {
    // Reset the quantity to 0
    setTransactionItem((prevItem) => ({
      ...prevItem,
      quantity: 0
    }));
  };

  const handleSearchProducts = () => {
    setShowProductList(true);
  };

  const handleCloseProductList = () => {
    setShowProductList(false);
  };

  const handlePaymentButtonClick = () => {
    setShowPaymentModal(true);
  };

  const handleCancelPayment = () => {
    setShowPaymentModal(false);
  };
  
  const handleEditButtonClick = (id) => {
    console.log("Editing product with ID:", id);
    setNewQuantity({
      productId: id,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setNewQuantity({
      productId: 0,
    });
    setShowEditModal(false);
  };

  const handleBegClick = () => {
    setShowBegBalModal(true);
  };

  const handleBegClose = () => {
    setShowBegBalModal(false);
  };

  const handleEndClick = () => {
    setShowEndModal(true);
  };

  const handleEndClose = () => {
    setShowEndModal(false);
  };

  const [searchQuery, setSearchQuery] = useState('');

  // Combine products and repackedProducts and filter based on the searchQuery
  const filteredProducts = [...products, ...repackedProducts].filter((product) => {
    // Convert product properties to strings and check if they include the searchQuery
    const query = searchQuery.toLowerCase();
    return (
      product.name?.toLowerCase().includes(query) || // Check if the name matches
      String(product.barcodeNo).includes(query) // Check if the barcode matches
    );
  });

  const handleProductClick = (barcode) => {
    setTransactionItem((prevTransactionItem) => ({
      ...prevTransactionItem, // Spread the existing properties
      barcodeNo: barcode,     // Update only the barcodeNo property
    }));
    console.log(transactionItem);
  };  

  return (
    <div className='w-screen h-full bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='flex flex-col w-[83.5vw] h-screen'>
        <div className='w-full h-[10%] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl z-10'>
          <h1 className='text-2xl text-darkp font-medium tracking-tighter'>Point of Sale System</h1>
          <div className='flex gap-4'>
            <button className='bg-gray-200 text-[0.8vw] text-darkp px-4 py-2 hover:bg-darkp hover:text-white button' onClick={handleBegClick}>Beginning Balance</button>
            <button className='bg-gray-200 text-[0.8vw] text-darkp px-4 py-2 hover:bg-darkp hover:text-white button' onClick={handleEndClick}>End of Day Cash Count</button>
          </div>
        </div>
        <div className='w-full h-[5%]'/>
        <div className='w-full h-[85%] flex'>
          <div className='flex flex-col w-[65%] h-full items-center'>
            <div className='flex w-full h-[32vw] justify-center items-center'>
              <div className='w-[90%] overflow-hidden h-full bg-white rounded-2xl drop-shadow-xl'>
                <div className='flex gap-8 justify-between items-center text-white text-[1vw] h-[4vw] w-full px-10 py-6 bg-darkp opacity-80 rounded-t-2xl'>
                  <h1 className='w-[16%] text-center'>Quantity</h1>
                  <h1 className='w-[16%] text-center'>UoM</h1>
                  <h1 className='w-[16%] text-center'>Product</h1>
                  <h1 className='w-[16%] text-center'>Unit Price</h1>
                  <h1 className='w-[16%] text-center'>Amount</h1>
                  <h1 className='w-[16%] text-center'>Actions</h1>
                </div>
                <div className='w-full h-[88%] flex flex-col'>
                  <div className='w-full h-full bg-white rounded-b-2xl overflow-auto hide-scrollbar'>
                      {transactionItems.map((item, index) => {
                        const product = getProduct(item.barcodeNo);
                        const stock = getStock(item);
                        const productName = product ? product.name : 'N/A';
                        const unitPrice = product ? product.unitPrice : 0;
                        const unitMeasurement = stock ? stock.displayUoM : 'N/A';

                        return (
                          <div key={index} className='flex gap-8 text-[1vw] items-center justify-between px-10 py-3 border-b border-gray-200'>
                            <h1 className='w-[16%] text-center'>{item.quantity}</h1>
                            <h1 className='w-[16%] text-center'>{unitMeasurement}</h1>
                            <h1 className='w-[16%] text-center'>{productName}</h1>
                            <h1 className='w-[16%] text-center'>₱ {unitPrice}</h1>
                            <h1 className='w-[16%] text-center'>₱ {(unitPrice * item.quantity).toFixed(2)}</h1>
                            <div className='flex justify-center gap-2 w-[16%] text-center'>
                              <button onClick={() => handleEditButtonClick(item.productID)}><img src={edit} alt="Edit" className='w-[1vw]' /></button>
                              <button onClick={() => handleDeleteProduct(item.productID)}><img src={del} alt="Delete" className='w-[1vw]' /></button>
                            </div>
                          </div>
                        )})}
                    </div>
                </div>
              </div>
            </div>
            <div className='w-full h-[2vw]'/>
            <div className='w-[90%] bg-darkp opacity-80 h-1/6 rounded-2xl px-10 flex flex-col justify-center gap-1 text-white drop-shadow-xl'>
              <div className='w-full flex justify-between'>
                <h1>Cost before discount:</h1>
                <h1>₱ {totalAmountGlobal}</h1>
              </div>
              <div className='w-full flex justify-between'>
                <h1 className='text-2xl'>Total Amount:</h1>
                <h1 className='text-2xl'>₱ {finalAmountGlobal}</h1>
              </div>
            </div>
          </div>
          <div className='w-[32%] h-full'>
            <div className='h-[7vw] w-full bg-white drop-shadow-xl rounded-2xl'>
              <div className='w-full h-[3vw] py-6 text-sm text-white bg-darkp flex opacity-80 items-center px-5 rounded-t-2xl'>
                Quantity:
              </div>
              <input
                type='number'
                name='quantity'
                value={transactionItem.quantity}
                onChange={handleChange}
                className='h-4/6 w-full px-5 text-4xl text-darkp font-bold border-none outline-none rounded-b-2xl'
                placeholder='enter quantity'
              />
            </div>
            <div className='flex gap-2 w-full h-2/5 justify-between mt-[2vw]'>
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
                <button onClick={() => handleNumberClick('0')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>0</button>
              </div>
            </div>
            <div className='flex w-full'>
              <select
                name="barcodeNo"
                value={transactionItem.barcodeNo}
                onChange={handleChange}
                placeholder='barcode'
                className={`w-full text-[1vw] outline-none py-5 border mt-8 rounded-l-lg shadow-2xl px-5g`}
              >
                <option value=''>-Input Barcode-</option>
                {products.map((product) => (
                  <option key={product.id} value={product.barcodeNo}>
                    {product.barcodeNo}
                  </option>
                ))}
                {repackedProducts.map((product) => (
                  <option key={product.id} value={product.barcodeNo}>
                    {product.barcodeNo}
                  </option>
                ))}
              </select>
              <button onClick={handleAddProduct} className='mt-8 py-4 px-8 bg-darkp text-white text-[0.9vw] font-medium bg-opacity-80 rounded-r-lg shadow-2xl leading-5'>
                Add Product
              </button>
            </div>
            <div className='flex mt-6 justify-between'>
              <button
                onClick={handleSearchProducts}
                className='w-[33%] h-[3.5vw] bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'
              >
                <h1 className='text-[0.9vw] font-medium p-[8%]'>Search P.</h1>
              </button>
              <button onClick={toggleDiscount} className='w-[33%] h-[3.5vw] bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'>
                <h1 className='text-[0.9vw] font-medium p-[8%]'>
                  {transaction.discountApplicable ? 'Remove Discount' : 'Apply Discount'}
                </h1>
              </button>
              <button 
                onClick={handlePaymentButtonClick}
                className='w-[33%] h-[3.5vw] bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'>
                <h1 className='text-[0.9vw] font-medium p-[8%]'>Payment</h1>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className='flex gap-3'>
                <button onClick={handleCloseProductList} className='text-darkp border border-darkp rounded-lg px-4 py-2 hover:bg-darkp hover:text-white button'>
                  Close
                </button>
              </div>
            </div>
            <div className='overflow-y-scroll px-10 mb-10'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='bg-darkp text-white sticky top-0'>
                    <th className='w-[25%] py-2 px-4 text-left'>Item Code</th>
                    <th className='w-[25%] py-2 px-4 text-left'>Product Name</th>
                    <th className='w-[25%] py-2 px-4 text-right'>Wholesale Price</th>
                    <th className='w-[25%] py-2 px-4 text-right'>Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((item, index) => {
                    const product = getProduct(item.barcodeNo);
                    const stock = getStock(item);
                    const productName = product ? product.name : 'N/A';

                    return (
                      <tr className='h-[5vw] hover:bg-gray-200 transition duration-200 ease-in-out'>
                        <td className='w-[25%] text-left'>{item.barcodeNo}</td>
                        <td className='w-[25%] text-left'>{productName}</td>
                        <td className='w-[25%] text-right'>₱ {product.wsp}</td>
                        <td className='w-[25%] text-right'>₱ {product.unitPrice}</td>
                      </tr>
                    )})}
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
                    <p className='text-6xl font-semibold tracking-tighter'>₱ {finalAmountGlobal}</p>
                  </div>
                  <div className='w-full flex flex-col gap-2 justify-start items-start bg-white border-2 rounded-2xl px-10 py-5'>
                    <p className='text-3xl font-semibold tracking-tight'>Amount Paid:</p>
                    <div className='flex gap-2 text-6xl font-semibold items-center justify-start'>
                      <p>₱</p>
                      <input
                        name='amountPaid'
                        value={transaction.amountPaid}
                        onChange={handleChangeTransaction}
                        type='number'
                        className='w-full text-6xl leading-5 outline-none bg-transparent tracking-tight placeholder:tracking-tighter'
                        placeholder='enter amount'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-20 h-full w-full bg-white border-2 rounded-2xl px-10 py-5'>
                  <p className='text-3xl font-semibold tracking-tight'>Change:</p>
                  <p className='text-3xl font-semibold tracking-tight'>P {customerChange}</p>
                </div>
              </div>
              <div className='flex gap-5 justify-end'>
                <button
                onClick={postTransaction}
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
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white w-min h-min p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
            <h2 className='text-black text-[1.3vw] font-black'>Edit Product:</h2>
            {/* Input for adding stock */}
            <div className='w-full flex gap-5'>
              <div className='w-full flex flex-col gap-5'>
                <div className='w-full flex flex-col justify-start gap-1'>
                  <label className='text-[0.7vw]'>Product Quantity</label>
                  <input name='qty' value={newQuantity.qty} onChange={handleQuantityChange} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                </div>
              </div>
            </div>
            <div className='flex gap-4'>
              <button
                className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-green-500 button'
                onClick={() => handleEditQuantity()} 
              >
                Confirm
              </button>
              <button
                className='px-[1vw] py-[1vh] bg-darkp text-white rounded-lg hover:bg-red-500 button'
                onClick={handleCloseEditModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showBegBalModal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white w-[25vw] h-[30vh] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
            <h2 className='text-black text-[1.3vw] font-black'>Enter Beginning Balance</h2>
            <div className='w-full flex gap-5'>
              <div className='w-full flex flex-col justify-start gap-1'>
                <label className='text-[0.7vw]'>Amount</label>
                <input name='beginningBalance' value={startCashCount.beginningBalance} onChange={handleChangeStartCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter amount' />
              </div>
            </div>
            <div className='flex gap-4'>
              <button
                onClick={handleSubmitStartCash}
                className="text-darkp text-[0.7vw] border border-darkp rounded-lg px-4 py-2 hover:bg-darkp hover:text-white button"
              >
                Confirm
              </button>
              <button
                className='px-[1vw] py-[1vh] bg-darkp text-[0.7vw] text-white rounded-lg hover:bg-red-500 button'
                onClick={handleBegClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showEndModal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white w-max h-min p-[2vw] rounded-xl shadow-lg flex items-start gap-5'>
            <div classNAme='flex flex-col w-full'>
              <h2 className='text-black text-[1.3vw] font-black mb-4'>End of Day Cash Denomination</h2>
              <div className='w-full flex gap-6'>
                <div className='w-[48%] flex flex-col gap-4'>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱1000.00</label>
                    <input name='thousand' value={endCashCount.thousand} onChange={handleChangeEndCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱500.00</label>
                    <input name='fiveHundred' value={endCashCount.fiveHundred} onChange={handleChangeEndCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱200.00</label>
                    <input name='twoHundred' value={endCashCount.twoHundred} onChange={handleChangeEndCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱100.00</label>
                    <input name='oneHundred' value={endCashCount.oneHundred} onChange={handleChangeEndCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱50.00</label>
                    <input name='fifty' value={endCashCount.fifty} onChange={handleChangeEndCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱20.00</label>
                    <input name='twenty' value={endCashCount.twenty} onChange={handleChangeEndCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start gap-4'>
                    <button
                      className='px-[1vw] py-[1vh] bg-darkp text-[0.7vw] text-white rounded-lg hover:bg-green-500 button'
                      onClick={handleSubmitEndCash}
                    >
                      Confirm
                    </button>
                    <button
                      className='px-[1vw] py-[1vh] bg-darkp text-[0.7vw] text-white rounded-lg hover:bg-red-500 button'
                      onClick={handleEndClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div className='w-[48%] flex flex-col gap-4'>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱10.00</label>
                    <input name='ten' value={endCashCount.ten} onChange={handleChangeEndCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱5.00</label>
                    <input name='five' value={endCashCount.five} onChange={handleChangeEndCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱1.00</label>
                    <input name='one' value={endCashCount.one} onChange={handleChangeEndCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱0.25</label>
                    <input name='twoFiveCent' value={endCashCount.twoFiveCent} onChange={handleChangeEndCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱0.10</label>
                    <input name='tenCent' value={endCashCount.tenCent} onChange={handleChangeEndCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱0.05</label>
                    <input name='fiveCent' value={endCashCount.fiveCent} onChange={handleChangeEndCount} type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;