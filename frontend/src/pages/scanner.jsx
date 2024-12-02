import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/sidebar';
import bg from '../assets/bg.jpg';
import del from '../assets/delete.png';
import edit from '../assets/edit.png';
import axios from 'axios';

const Scanner = () => {
  
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products to display
  const [searchQuery, setSearchQuery] = useState(''); // User's search query

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
        setFilteredProducts(response.data);
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
    fetchProducts();
    fetchStocks();
  }, []);


  const addOrUpdateTransactionItem = (product, quantity) => {
    setTransactionItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productID === product.id
      );
  
      if (existingItemIndex !== -1) {
        // Update existing product quantity and total
        const updatedItems = [...prevItems];
        const updatedQuantity = updatedItems[existingItemIndex].quantity + quantity;
  
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedQuantity,
          productTotal: updatedQuantity * product.unitPrice,
        };
  
        return updatedItems;
      }
  
      // Add new product at the top
      return [
        {
          productID: product.id,
          quantity: quantity,
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

  const handleSearchProducts = () => {
    setShowProductList(true);
  };

  const handleCloseProductList = () => {
    setSearchQuery(''); // Clear search input
    setFilteredProducts(products); // Reset filtered products
    setSelectedProduct(null); // Reset selected product
    setShowProductList(false); // Close modal
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
  
    // Use the inputted quantity from transactionItem
    const inputQuantity = Number(transactionItem.quantity);
  
    if (inputQuantity <= 0) {
      console.warn('Invalid quantity. Must be greater than zero.');
      return;
    }
  
    addOrUpdateTransactionItem(product, inputQuantity); // Add or increment by inputted quantity
    setSelectedProduct(product); // Set the selected product
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  
    // Perform filtering directly
    const filtered = products.filter((product) => {
      const nameMatch = product.name?.toLowerCase().includes(query);
      const barcodeMatch = product.barcodeNo?.toLowerCase().includes(query);
      const supplierMatch = product.supplier?.supplierName?.toLowerCase().includes(query);
      return nameMatch || barcodeMatch || supplierMatch;
    });
  
    setFilteredProducts(filtered);
  };

  
  
  

  

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Point of Sale System</h1>
          <div className='flex gap-4'>
            <button className='bg-gray-200 text-[0.8vw] text-darkp px-4 py-2 hover:bg-darkp hover:text-white button' onClick={handleBegClick}>Beginning Balance</button>
            <button className='bg-gray-200 text-[0.8vw] text-darkp px-4 py-2 hover:bg-darkp hover:text-white button' onClick={handleEndClick}>End of Day Cash Count</button>
          </div>
        </div>
        <div className='w-full h-full flex px-10 gap-5 mt-10'>
          <div className="h-full w-[80vw] flex flex-col gap-5 items-center">
            <div className="w-full h-[60vh] rounded-2xl flex flex-col drop-shadow">
              {/* Table Header */}
              <div className="h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10 sticky top-0 z-10">
                <h1 className="w-[8vw] text-[0.7vw] leading-tight text-center">Quantity</h1>
                <h1 className="w-[8vw] text-[0.7vw] leading-tight text-center">UoM</h1>
                <h1 className="w-[8vw] text-[0.7vw] text-center">Product</h1>
                <h1 className="w-[8vw] text-[0.7vw] leading-tight text-center">Unit Price</h1>
                <h1 className="w-[8vw] text-[0.7vw] leading-tight text-center">Amount</h1>
                <h1 className="w-[8vw] text-[0.7vw] text-center">Actions</h1>
              </div>
              {/* Table Body */}
              <div className="w-full h-full bg-white rounded-b-2xl overflow-y-auto hide-scrollbar">
                {transactionItems.map((item, index) => {
                  const product = products.find((p) => String(p.id) === String(item.productID));
                  const stock = stocks.find((s) => String(s.productId) === String(item.productID));
                  const productName = product ? product.name : 'N/A';
                  const unitPrice = product ? product.unitPrice : 0;
                  const unitMeasurement = stock ? stock.displayUoM : 'N/A';

                  return (
                    <div
                      key={index}
                      className="flex text-[1vw] items-center justify-between px-10 py-3 border-b border-gray-200"
                    >
                      <h1 className="w-[8vw] text-[0.7vw] text-center">{item.quantity}</h1>
                      <h1 className="w-[8vw] text-[0.7vw] text-center">{unitMeasurement}</h1>
                      <h1 className="w-[8vw] text-[0.7vw] text-center">{productName}</h1>
                      <h1 className="w-[8vw] text-[0.7vw] text-center">₱ {unitPrice}</h1>
                      <h1 className="w-[8vw] text-[0.7vw] text-center">₱ {(unitPrice * item.quantity).toFixed(2)}</h1>
                      <div className="flex justify-center gap-2 w-[8vw] text-[0.7] text-center">
                        <button onClick={() => handleEditButtonClick(item.productID)}>
                          <img src={edit} alt="Edit" className="w-[0.8vw]" />
                        </button>
                        <button onClick={() => handleDeleteProduct(item.productID)}>
                          <img src={del} alt="Delete" className="w-[0.8vw]" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Summary Section */}
            <div className="w-full h-[15vh] rounded-2xl flex flex-col gap-2 drop-shadow bg-darkp opacity-80 justify-center">
              <div className="w-full flex px-10 justify-between items-center text-white font-bold tracking-tighter">
                <h1 className="text-[1vw]">Cost before Discount:</h1>
                <h1 className="text-[1vw]">₱ {totalAmountGlobal}</h1>
              </div>
              <div className="w-full flex px-10 justify-between items-center text-white font-bold tracking-tighter">
                <h1 className="text-[1.5vw]">Total Amount:</h1>
                <h1 className="text-[1.5vw]">₱ {finalAmountGlobal}</h1>
              </div>
            </div>
          </div>
          <div className='h-full w-full flex flex-col gap-5'>
            <div className='h-[7vw] w-full bg-white drop-shadow-xl rounded-2xl'>
              <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.7vw] flex justify-between items-center px-10'>
                Quantity:
              </div>
              <input
                type="text" // Changed to text for custom validation
                name="quantity"
                value={transactionItem.quantity}
                onChange={(e) =>
                  handleNumericInput(e, (value) =>
                    setTransactionItem((prev) => ({ ...prev, quantity: value }))
                  )
                }
                onKeyDown={(e) => handleNumericInput(e)}
                className="h-4/6 w-full px-5 text-[2.5vw] text-darkp font-bold border-none outline-none rounded-b-2xl"
                placeholder="Enter quantity"
              />

            </div>
            <div className='flex gap-2 w-full h-[30vh] justify-between mt-3'>
              <div className='flex flex-col gap-2 justify-between w-full'>
                <button onClick={() => handleNumberClick('7')} className='h-full rounded-2xl bg-white drop-shadow-xl text-[1.2vw] hover:bg-darkp2 hover:text-white button'>7</button>
                <button onClick={() => handleNumberClick('4')} className='h-full rounded-2xl bg-white drop-shadow-xl text-[1.2vw] hover:bg-darkp2 hover:text-white button'>4</button>
                <button onClick={() => handleNumberClick('1')} className='h-full rounded-2xl bg-white drop-shadow-xl text-[1.2vw] hover:bg-darkp2 hover:text-white button'>1</button>
              </div>
              <div className='flex flex-col gap-2 justify-between w-full'>
                <button onClick={() => handleNumberClick('8')} className='h-full rounded-2xl bg-white drop-shadow-xl text-[1.2vw] hover:bg-darkp2 hover:text-white button'>8</button>
                <button onClick={() => handleNumberClick('5')} className='h-full rounded-2xl bg-white drop-shadow-xl text-[1.2vw] hover:bg-darkp2 hover:text-white button'>5</button>
                <button onClick={() => handleNumberClick('2')} className='h-full rounded-2xl bg-white drop-shadow-xl text-[1.2vw] hover:bg-darkp2 hover:text-white button'>2</button>
              </div>
              <div className='flex flex-col gap-2 justify-between w-full'>
                <button onClick={() => handleNumberClick('9')} className='h-full rounded-2xl bg-white drop-shadow-xl text-[1.2vw] hover:bg-darkp2 hover:text-white button'>9</button>
                <button onClick={() => handleNumberClick('6')} className='h-full rounded-2xl bg-white drop-shadow-xl text-[1.2vw] hover:bg-darkp2 hover:text-white button'>6</button>
                <button onClick={() => handleNumberClick('3')} className='h-full rounded-2xl bg-white drop-shadow-xl text-[1.2vw] hover:bg-darkp2 hover:text-white button'>3</button>
              </div>
              <div className='flex flex-col gap-2 justify-between w-full'>
                <button onClick={handleClear} className='h-full rounded-2xl bg-white drop-shadow-xl text-md hover:bg-red-400 hover:text-white button'>CLEAR</button>
                <button onClick={() => handleNumberClick('0')} className='h-full rounded-2xl bg-white drop-shadow-xl text-[1.2vw] hover:bg-darkp2 hover:text-white button'>0</button>
              </div>
            </div>
            <div className='flex w-full'>
              <select
                name="productID"
                value={transactionItem.productID}
                onChange={handleChange}
                placeholder='barcode'
                className={`w-full text-[1vw] outline-none py-5 border rounded-l-lg shadow-2xl px-5`}
              >
                <option value=''></option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.barcodeNo}
                  </option>
                ))}
              </select>
              <button onClick={handleAddProduct} className='py-4 px-8 bg-darkp text-white text-left text-[0.7vw] font-bold bg-opacity-80 rounded-r-lg shadow-2xl leading-4'>
                Add Product
              </button>
            </div>
            <div className='flex justify-between'>
              <button
                onClick={handleSearchProducts}
                className='w-[8.5vw] h-[3.5vw] bg-darkp opacity-80 text-white text-[0.7vw] leading-4 border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'
              >
                <h1 className='font-bold'>Search P.</h1>
              </button>
              <button
                onClick={toggleDiscount}
                className='w-[8.5vw] h-[3.5vw] bg-darkp opacity-80 text-white text-[0.7vw] leading-4 border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'
              >
                <h1 className='font-bold'>{transaction.discountApplicable ? 'Remove Discount' : 'Apply Discount'}</h1>
              </button>
              <button
                onClick={handlePaymentButtonClick}
                className='w-[8.5vw] h-[3.5vw] bg-darkp opacity-80 text-white text-[0.7vw] leading-4 border-2 rounded-2xl drop-shadow-xl hover:opacity-100 button flex justify-center items-center'
              >
                <h1 className='font-bold'>Payment</h1>
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
              onClick={() => {
                if (selectedProduct) {
                  addOrUpdateTransactionItem(selectedProduct, Number(transactionItem.quantity));
                  setSelectedProduct(null); // Reset selection
                } else {
                  console.warn('No product selected');
                }
              }}
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
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-4 py-2 text-darkp text-[0.7vw] font-light outline-none w-4/12 rounded-full border border-darkp placeholder:text-darkp2"
                placeholder="Search for products..."
              />
              <div className='flex gap-3'>
              <button
                onClick={() => {
                  try {
                    if (selectedProduct) {
                      const quantity = Number(transactionItem.quantity); // Use the entered quantity

                      if (quantity <= 0) {
                        console.warn('Invalid quantity. Must be greater than zero.');
                        return;
                      }

                      addOrUpdateTransactionItem(selectedProduct, quantity); // Add the selected product to the transaction
                      setSelectedProduct(null); // Reset the selected product
                      setSearchQuery(''); // Clear search input
                      setFilteredProducts(products); // Reset filtered products
                      handleCloseProductList(); // Close modal after adding the product
                    } else {
                      console.warn('No product selected.');
                    }
                  } catch (error) {
                    console.error("Error adding product:", error);
                  }
                }}
                className="text-darkp text-[0.7vw] border border-darkp rounded-lg px-4 py-2 hover:bg-darkp hover:text-white button"
              >
                Add
              </button>


                <button onClick={(handleCloseProductList)}
                  className='text-darkp text-[0.7vw] border border-darkp rounded-lg px-4 py-2 hover:bg-darkp hover:text-white button'>
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
                  {filteredProducts.map((product, index) => {
                    const unitPrice = parseFloat(product.unitPrice) || 0;
                    const wholesalePrice = parseFloat(product.wholesalePrice) || 0;

                    return (
                      <tr
                        key={index}
                        className={`hover:bg-gray-100 cursor-pointer ${
                          selectedProduct && selectedProduct.id === product.id ? 'bg-gray-200' : ''
                        }`}
                        onClick={() => setSelectedProduct(product)} // Set the selected product
                      >
                        <td className="py-2 px-4">{product.barcodeNo || 'N/A'}</td>
                        <td className="py-2 px-4">{product.name || 'N/A'}</td>
                        <td className="py-2 px-4">{product.supplier ? product.supplier.supplierName : 'N/A'}</td>
                        <td className="py-2 px-4">₱ {wholesalePrice.toFixed(2)}</td>
                        <td className="py-2 px-4">₱ {unitPrice.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>


              </table>
            </div>
          </div>
        </div>
      )}
      {showPaymentModal && (
        <div className='fixed inset-0 w-full right-0 flex items-end justify-end z-50'>
          <div className='bg-cover bg-center h-full w-full flex justify-center' style={{ backgroundImage: `url(${bg})` }}>
            <div className='w-10/12 px-10 py-24 flex flex-col gap-10 mt-4'>
              <h2 className='text-[3vw] text-left text-white bg-darkp opacity-80 rounded-2xl px-5 py-5 font-semibold tracking-tighter'>Payment Confirmation</h2>
              <div className='h-3/6 flex gap-5 items-start justify-center'>
                <div className='h-full flex flex-col gap-3'>
                  <div className='w-full h-full flex flex-col gap-5 justify-start items-start bg-white border-2 rounded-2xl opacity-70 px-10 py-5'>
                    <p className='text-[2vw] font-semibold tracking-tight'>Total Amount:</p>
                    <p className='text-[3vw] font-semibold tracking-tighter leading-7'>₱ {finalAmountGlobal}</p>
                  </div>
                  <div className='w-full flex flex-col gap-2 justify-start items-start bg-white border-2 rounded-2xl px-10 py-5'>
                    <p className='text-[2vw] font-semibold tracking-tight'>Amount Paid:</p>
                    <div className='flex gap-2 text-6xl font-semibold items-center justify-start'>
                      <p>₱</p>
                      <input
                        name='amountPaid'
                        value={transaction.amountPaid}
                        onChange={handleChangeTransaction}
                        type='number'
                        className='w-full text-[3vw] leading-7 outline-none bg-transparent tracking-tight placeholder:tracking-tighter'
                        placeholder='enter amount'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-20 h-full w-full bg-white border-2 rounded-2xl px-10 py-5'>
                  <p className='text-[2vw] font-semibold tracking-tight'>Change:</p>
                  <p className='text-[7vw] font-semibold leading-10 tracking-tight'>P {transaction.amountPaid <= 0 ? 0 : Math.max(0, customerChange)}</p>
                </div>
              </div>
              <div className='flex gap-5 justify-end'>
                <button
                  onClick={postTransaction}
                  className='bg-darkp opacity-80 hover:opacity-100 button text-white text-[0.9vw] tracking-tight px-4 py-2 rounded'
                >
                  Proceed with Payment
                </button>
                <button
                  onClick={handleCancelPayment}
                  className='bg-darkp opacity-80 hover:opacity-100 button text-white text-[0.9vw] tracking-tight px-4 py-2 rounded'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white w-min h-min p-[2vw] rounded-xl shadow-lg flex flex-col items-start gap-5'>
            <h2 className='text-black text-[1.3vw] font-black'>Edit Product:</h2>
            {/* Input for adding stock */}
            <div className='w-full flex gap-5'>
              <div className='w-full flex flex-col gap-5'>
                <div className='w-full flex flex-col justify-start gap-1'>
                  <label className='text-[0.7vw]'>Product Quantity</label>
                  <input
                    name="qty"
                    value={newQuantity.qty}
                    onChange={(e) =>
                      handleNumericInput(e, (value) =>
                        setNewQuantity((prev) => ({ ...prev, qty: value }))
                      )
                    }
                    onKeyDown={(e) => handleNumericInput(e)}
                    type="text"
                    className="w-full border border-darkp rounded-md px-5 py-2 placeholder:text-[0.6vw]"
                    placeholder="Enter quantity"
                  />

                </div>
              </div>
            </div>
            <div className='flex gap-4'>
              <button
                className='px-[1vw] py-[1vh] text-[0.7vw] bg-darkp text-white rounded-lg hover:bg-green-500 button'
                onClick={() => handleEditQuantity()}
              >
                Confirm
              </button>
              <button
                className='px-[1vw] py-[1vh] text-[0.7vw] bg-darkp text-white rounded-lg hover:bg-red-500 button'
                onClick={handleCloseEditModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default Scanner;