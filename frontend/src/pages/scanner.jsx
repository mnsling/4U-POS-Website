import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/sidebar';
import bg from '../assets/bg.jpg';

const Scanner = () => {

  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    productID: '',
    quantity: 1,
    price: 0,
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

  useEffect(() => {
    ``
    axios.get("http://127.0.0.1:8000/supplier/")
    .then(response => setSuppliers(response.data))
    .catch(error => console.error("Error fetching suppliers:", error));
    fetchProducts();
    fetchStocks();
  }, []);

  const addOrUpdateTransactionItem = (product, quantity) => {
    setTransactionItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productID === product.id
      );
  
      if (existingItemIndex !== -1) {
        // Increment the quantity and update the total for the existing product
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
  
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity, // Increment quantity
          productTotal: newQuantity * product.unitPrice, // Recalculate total
        };
  
        return updatedItems;
      }
  
      // Add new product as a new item
      return [
        {
          productID: product.id,
          quantity: quantity, // Set initial quantity
          price: product.unitPrice,
          productTotal: quantity * product.unitPrice,
        },
        ...prevItems,
      ];
    });
  };
  
  

  const handleAddProduct = () => {
    if (!transactionItem.productID || transactionItem.quantity <= 0) {
      console.warn('Please select a valid product and enter a valid quantity before adding.');
      return;
    }
  
    const product = products.find(
      (p) => String(p.id) === String(transactionItem.productID)
    );
  
    if (!product) {
      console.warn('Selected product not found in product list.');
      return;
    }
  
    addOrUpdateTransactionItem(product, Number(transactionItem.quantity)); // Add or increment by specified quantity
  
    // Reset the transactionItem to default values
    setTransactionItem({
      id: '',
      transactionID: '',
      productID: '',
      quantity: 1,
      price: 0,
    });
  };

  const handleDeleteProduct = (productID) => {
    setTransactionItems(prevItems =>
      prevItems.filter(item => item.productID !== productID)
    );
    console.log(`Deleted product with ID: ${productID}`);
  };

  const [newQuantity, setNewQuantity] = useState({
    qty: 0,
    productId: 0,
  });

  const handleEditQuantity = () => {
    console.log(newQuantity);
  
    const productID = newQuantity.productId;
  
    setTransactionItems((prevItems) =>
      prevItems.map((item) =>
        item.productID === productID
          ? { ...item, quantity: Number(newQuantity.qty) } // Ensure the quantity is a number
          : item
      )
    );
  
    console.log(`Updated quantity for product ID: ${productID} to ${newQuantity.qty}`);
  
    // Close the edit modal after updating
    handleCloseEditModal();
  };
  

  const handleQuantityChange = (e) => {
    const { name, value } = e.target;
  
    // Strictly allow only digits
    if (/^\d+$/.test(value) || value === '') { // Allow only numeric characters or an empty string
      setNewQuantity((prevQuantity) => ({
        ...prevQuantity,
        [name]: value,
      }));
    } else {
      console.warn('Invalid input: Only numbers are allowed.');
    }
  };

  const enrichedProducts = useMemo(() => {
    return products.map(product => {
      const stock = stocks.find(stock => String(stock.productId) === String(product.id));
      const supplier = suppliers.find(supplier => String(supplier.id) === String(stock?.supplier));
      const supplierName = supplier?.supplierName || "N/A";
      const wholesalePrice = product.wsp ? parseFloat(product.wsp).toFixed(2) : "0.00";
  
      return {
        ...product,
        supplierName,
        wholesalePrice,
      };
    });
  }, [products, stocks, suppliers]);
  
  

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

          const product = products.find((p) => String(p.id) === String(item.productID));
          const price = product.unitPrice;

          console.log(product);

          const stock = stocks.find((s) => String(s.productId) === String(item.productID));
          const unitMeasurement = stock.unitMeasurement;

          console.log(stock);

          return axios.post('http://127.0.0.1:8000/transactionItem/', {
            transactionID: transactionID,
            productID: item.productID,
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
      const product = products.find((p) => String(p.id) === String(item.productID));
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

  const [showBegBalModal, setShowBegBalModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleNumericInput = (e, callback) => {
    if (e.type === 'keydown') {
      if (
        e.key === 'e' ||
        e.key === 'E' ||
        e.key === '-' ||
        e.key === '+' ||
        e.key === '=' ||
        e.key === '.'
      ) {
        e.preventDefault();
        return;
      }
    }
  
    if (e.type === 'change') {
      const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
      callback(value);
    }
  };

  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product

  const handleProductSelection = (product) => {
    if (!product) {
      console.warn('No product selected');
      return;
    }
  
    // addOrUpdateTransactionItem(product, 1); // Add or increment by 1 when selecting
    setSelectedProduct(product);
  };


  const filteredProducts = useMemo(() => {
    // Filter enrichedProducts based on the searchTerm
    return enrichedProducts.filter((product) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        product.barcodeNo?.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.supplierName?.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  }, [searchTerm, enrichedProducts]);

  
  
  

  

  return (
    <div className='w-screen h-full bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='flex flex-col w-[83.5vw] h-screen'>
        <div className='w-full h-[10%] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl z-10'>
          <h1 className='text-2xl text-darkp font-medium tracking-tighter'>Point of Sale System</h1>
        </div>
        <div className='w-full h-[5%]'/>
        <div className='w-full h-[85%] flex'>
          <div className='flex flex-col w-[65%] h-full items-center'>
            <div className='flex w-full h-[32vw] justify-center items-center'>
              <div className='w-[90%] h-full bg-white rounded-2xl drop-shadow-xl'>
                <div className='flex gap-[3vw] justify-between items-center text-white text-sm h-[4vw] w-full px-10 py-6 bg-darkp opacity-80 rounded-t-2xl'>
                  <h1 className='w-[15%] text-center'>Quantity</h1>
                  <h1 className='w-[15%] text-center'>Unit of Measurement</h1>
                  <h1 className='w-[15%] text-center'>Product Name</h1>
                  <h1 className='w-[15%]text-center'>Unit Price</h1>
                  <h1 className='w-[15%] text-center'>Amount</h1>
                </div>
                <div ref={listRef} className='overflow-y-auto'>
                  {addedProducts.map((product, index) => (
                    <div key={index} className='flex gap-8 justify-between px-10 py-3 border-b border-gray-200'>
                      <span className='w-[15%] text-sm text-center'>{product.quantity}</span>
                      <span className='w-[15%] text-center text-sm'>{product.uom}</span>
                      <span className='w-[15%] text-sm text-center'>{product.name}</span>
                      <span className='w-[15%] text-center text-sm'>₱ {product.unitPrice.toFixed(2)}</span>
                      <span className='w-[15%] text-center text-sm'>₱ {(product.unitPrice * product.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='w-full h-[2vw]'/>
            <div className='w-[90%] bg-darkp opacity-80 h-1/6 rounded-2xl px-10 flex flex-col justify-center gap-1 text-white drop-shadow-xl'>
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
          <div className='w-[32%] h-full'>
            <div className='h-[7vw] w-full bg-white drop-shadow-xl rounded-2xl'>
              <div className='w-full h-[3vw] py-6 text-sm text-white bg-darkp flex opacity-80 items-center px-5 rounded-t-2xl'>
                Quantity:
              </div>
              <input
                type="text"
                name="quantity"
                value={transactionItem.quantity}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^\d+$/.test(value) || value === '') { // Allow only numeric values or an empty string
                    setTransactionItem((prev) => ({ ...prev, quantity: value }));
                  } else {
                    console.warn("Invalid input. Please enter a number.");
                  }
                }}
                className="h-4/6 w-full px-5 text-[2.5vw] text-darkp font-bold border-none outline-none rounded-b-2xl"
                placeholder="Enter quantity"
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
                <button className='h-full rounded-2xl bg-white drop-shadow-xl text-md hover:bg-green-400 hover:text-white button'>ENTER</button>
                <button className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>*</button>
                <button onClick={() => handleNumberClick('0')} className='h-full rounded-2xl bg-white drop-shadow-xl text-2xl hover:bg-darkp2 hover:text-white button'>0</button>
              </div>
            </div>
            <div className='flex w-full'>
              <input type='text' placeholder='barcode' className='w-full text-[1vw] outline-none py-5 border mt-8 rounded-l-lg shadow-2xl px-5'/>
              <button className='mt-8 py-4 px-8 bg-darkp text-white text-[0.9vw] font-medium bg-opacity-80 rounded-r-lg shadow-2xl leading-5'>Add Product</button>
            </div>
            <div className='flex mt-6 justify-between'>
              <button
                onClick={handleSearchProducts}
                className='w-[24%] h-[3.5vw] bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'
              >
                <h1 className='text-[0.9vw] font-medium p-[8%]'>Search P.</h1>
              </button>
              <button className='w-[24%] h-[3.5vw] bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'>
                <h1 className='text-[0.9vw] font-medium p-[8%]'>Discount</h1>
              </button>
              <button className='w-[24%] h-[3.5vw] bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'>
                <h1 className='text-[0.9vw] font-medium p-[8%]'>S. Charge</h1>
              </button>
              <button onClick={handlePaymentButtonClick} className='w-[24%] h-[3.5vw] bg-darkp opacity-80 text-white border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'>
                <h1 className='text-[0.9vw] font-medium p-[8%]'>Payment</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showBegBalModal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white w-[25vw] h-[30vh] p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
            <h2 className='text-black text-[1.3vw] font-black'>Enter Beginning Balance</h2>
            <div className='w-full flex gap-5'>
              <div className='w-full flex flex-col justify-start gap-1'>
                <label className='text-[0.7vw]'>Amount</label>
                <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter amount' />
              </div>
            </div>
            <div className='flex gap-4'>
              <button
                className='px-[1vw] py-[1vh] bg-darkp text-[0.7vw] text-white rounded-lg hover:bg-green-500 button'
                onClick={handleBegClose}
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
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱500.00</label>
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱200.00</label>
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱100.00</label>
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱50.00</label>
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱20.00</label>
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start gap-4'>
                    <button
                      className='px-[1vw] py-[1vh] bg-darkp text-[0.7vw] text-white rounded-lg hover:bg-green-500 button'
                      onClick={handleEndClose}
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
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱5.00</label>
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱1.00</label>
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱0.25</label>
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱0.10</label>
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                  <div className='w-full flex justify-start items-center gap-5'>
                    <label className='text-[0.7vw] w-[3vw]'>₱0.05</label>
                    <input type='number' className='w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]' placeholder='enter quantity' />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}
     {showProductList && (
  <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
    <div className='bg-white w-8/12 h-3/4 rounded-2xl drop-shadow-xl flex flex-col'>
      <div className='flex justify-between items-center py-6 pl-10 pr-14 bg-white text-black rounded-t-2xl w-full'>
        <h1 className='text-[1vw] font-medium'>Products List</h1>
        <input
          type="text"
          value={searchTerm} // Bind the searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on change
          className='px-4 py-2 text-darkp text-[0.7vw] font-light outline-none w-4/12 rounded-full border border-darkp placeholder:text-darkp2'
          placeholder="Search for products"
        />
        <div className='flex gap-3'>
          <button
            onClick={() => {
              const inputQuantity = Number(transactionItem.quantity); // Fetch the latest quantity value
              console.log("Input Quantity:", inputQuantity);

              if (!inputQuantity || inputQuantity <= 0) {
                console.warn("Please enter a valid quantity before adding the product.");
                return;
              }

              try {
                if (selectedProduct) {
                  console.log("Selected Product:", selectedProduct);
                  addOrUpdateTransactionItem(selectedProduct, inputQuantity);
                  console.log(`Added product: ID = ${selectedProduct.id}, Quantity = ${inputQuantity}`);

                  // Clear the quantity input after adding
                  setTransactionItem((prev) => ({ ...prev, quantity: 1 })); // Reset to default or desired value
                } else {
                  console.warn("No product selected.");
                }
              } catch (error) {
                console.error("Error adding product:", error);
              }

              // Close the product list modal
              handleCloseProductList();
            }}
            className="text-darkp text-[0.7vw] border border-darkp rounded-lg px-4 py-2 hover:bg-darkp hover:text-white button"
          >
            Add
          </button>

          <button
            onClick={handleCloseProductList}
            className='text-darkp text-[0.7vw] border border-darkp rounded-lg px-4 py-2 hover:bg-darkp hover:text-white button'
          >
            Close
          </button>
        </div>
      </div>
      <div className='overflow-y-scroll hide-scrollbar px-10 mb-10'>
        <table className='w-full text-left'>
          <thead>
            <tr className='bg-darkp text-white text-[0.7vw] sticky top-0'>
              <th className='py-2 px-4'>Item Code</th>
              <th className='py-2 px-4'>Product Name</th>
              <th className='py-2 px-4'>Supplier</th>
              <th className='py-2 px-4'>Wholesale Price</th>
              <th className='py-2 px-4'>Unit Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => ( // Use filteredProducts for dynamic rendering
              <tr
                key={index}
                className={`hover:bg-gray-100 ${
                  selectedProduct && selectedProduct.id === product.id ? 'bg-gray-200' : ''
                }`}
                onClick={() => setSelectedProduct(product)} // Set selected product on click
              >
                <td className='py-2 px-4'>{product.barcodeNo || 'N/A'}</td>
                <td className='py-2 px-4'>{product.name || 'N/A'}</td>
                <td className='py-2 px-4'>{product.supplierName || 'N/A'}</td>
                <td className='py-2 px-4'>₱ {product.wholesalePrice ? parseFloat(product.wholesalePrice).toFixed(2) : '0.00'}</td>
                <td className='py-2 px-4'>₱ {product.unitPrice ? parseFloat(product.unitPrice).toFixed(2) : '0.00'}</td>
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
                  <p className='text-[2vw] font-semibold tracking-tight'>Change:</p>
                  <p className='text-[7vw] font-semibold leading-10 tracking-tight'>P {Math.max(customerChange, 0)}</p>
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