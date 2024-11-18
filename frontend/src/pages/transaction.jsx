import React, { useState, useEffect } from 'react'
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'
import info from '../assets/info.png'
import exit from '../assets/reject.png'
import axios from 'axios'


const Transaction = () => {

  const [transactions, setTransactions] = useState([]);
  const [transactionItems, setTransactionItems] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchTransactions = () => {
    axios.get('http://127.0.0.1:8000/transaction/')
      .then(response => {
        setTransactions(response.data);
        console.log(response.data); // Log the updated product list
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchTransactionItems = () => {
    axios.get('http://127.0.0.1:8000/transactionItem/')
      .then(response => {
        setTransactionItems(response.data);
        console.log(response.data); // Log the updated product list
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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

  useEffect(() => {``
    fetchTransactions();
    fetchTransactionItems();
    fetchProducts();
  }, []);

  const[transactionView, setTransactionView] = useState([]);

  const transactionTotal = parseFloat(transactions.reduce((total, transaction) => {
    return total + parseFloat(transaction.finalAmount || 0); // Ensure the value is treated as a number
  }, 0).toFixed(2)); // Limit the total to 2 decimal places and convert it back to a number  

  const [showDetailsPrompt, setShowDetailsPrompt] = useState(false);

  const handleDetailsClick = (transaction) => {
    setShowDetailsPrompt(true);
    setTransactionView(transaction);
  };

  const handleClosePrompt = () => {
    setShowDetailsPrompt(false);
    setTransactionView();
  };

  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar />
      <div className='w-[83.5vw] h-screen flex flex-col items-center z-50'>
        <div className='w-full h-[10vh] bg-white flex items-center justify-between px-[2vw] drop-shadow-xl'>
          <h1 className='text-[1.5vw] text-darkp font-medium tracking-tighter z-10'>Transactions</h1>
        </div>
        <div className='h-[100vh] w-[80vw] flex flex-col gap-5 items-center mt-10'>
          <div className='w-full flex justify-between'>
            <div className='w-[15.5vw] flex justify-between gap-5'>
              <select className='py-2 px-4 w-[8vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                <option>All</option>
                <option>Terminal 1</option>
                <option>Terminal 2</option>
                <option>Terminal 3</option>
              </select>
              <input type='datetime-local' className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button' />
            </div>
          </div>
          <div className='w-full h-[63vh] rounded-2xl flex flex-col drop-shadow'>
            <div className='h-[6vh] bg-darkp opacity-80 rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
              <h1 className='w-[16%] text-[0.7vw] leading-tight text-center'>Time</h1>
              <h1 className='w-[16%] text-[0.7vw] leading-tight text-center'>Date</h1>
              <h1 className='w-[16%] text-[0.7vw] text-center'>Terminal #</h1>
              <h1 className='w-[16%] text-[0.7vw] leading-tight text-center'>Sales Invoice</h1>
              <h1 className='w-[16%] text-[0.7vw] leading-tight text-center'>Amount</h1>
              <h1 className='w-[16%] text-[0.7vw] text-center'>Actions</h1>
            </div>
            <div className='w-full h-full bg-white rounded-b-2xl overflow-auto'>
            {transactions.map(transaction => {
              let terminal = '';

              if (transaction.terminalIssued === 'ONE') {
                terminal = '1';
              } else if (transaction.terminalIssued === 'TWO') {
                terminal = '2';
              } else if (transaction.terminalIssued === 'THREE') {
                terminal = '3';
              }

              // Parse date and time from transactionTime
              const transactionDateTime = new Date(transaction.transactionTime);
              const transactionDate = transactionDateTime.toLocaleDateString(); // Format to date only
              const transactionTime = transactionDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Format to time only

              return (
                <div key={transaction.id} className='w-full text-darkp text-center flex items-center justify-between px-10 py-2 border-b border-gray-200'>
                  <h1 className='w-[16%] text-[0.8vw]'>{transactionTime}</h1>
                  <h1 className='w-[16%] text-[0.8vw]'>{transactionDate}</h1>
                  <h1 className='w-[16%] text-[0.8vw]'>Terminal {terminal}</h1>
                  <h1 className='w-[16%] text-[0.8vw]'>Transaction #{transaction.id}</h1>
                  <h1 className='w-[16%] text-[0.8vw]'>{transaction.finalAmount}</h1>
                  <h1 className='w-[16%] flex gap-[1vw] justify-center'>
                    <button>
                      <img
                        src={info}
                        alt='edit'
                        className='w-[0.8vw] h-[0.8vw] cursor-pointer'
                        onClick={() => handleDetailsClick(transaction)}
                      />
                    </button>
                  </h1>
                </div>
              );
            })}
            </div>
          </div>
          <div className='w-full h-[12vh] rounded-2xl flex flex-col drop-shadow bg-darkp opacity-80'>
            <div className='w-full h-full flex px-10 justify-between items-center text-white font-bold tracking-tighter'>
              <h1 className='text-2xl'>Total Amount:</h1>
              <h1 className='text-2xl'>Php {transactionTotal}</h1>
            </div>
          </div>
          {/* Details Modal */}
          {showDetailsPrompt && (
            <div className='fixed top-0 left-0 w-full h-full flex'>
              <div className='bg-white w-full h-full p-[2vw] flex flex-col items-start gap-5'>
                <div className='w-full flex items-center'>
                  <div className='w-full flex justify-start'>
                    <div className='text-darkp w-full flex flex-col gap-5'>
                      <div className='flex gap-10 items-end'>
                        <h1 className='text-[3vw] font-bold tracking-tighter'>INVOICE #{transactionView.id}</h1>
                      </div>
                      <div className='w-full flex gap-10'>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Terminal </h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>
                            {transactionView.terminalIssued === 'ONE' ? '1' : transactionView.terminalIssued === 'TWO' ? '2' : '3'}
                            </h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Date:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>
                            {new Date(transactionView.transactionTime).toLocaleDateString()}
                            </h1>
                          </div>
                        </div>
                        <div className='w-[20vw] flex flex-col gap-2'>
                          <div className='flex justify-between border-b border-darkp px-2 py-1'>
                            <h1 className='text-[0.8vw] font-bold tracking-tighter'>Time:</h1>
                            <h1 className='text-[0.8vw] tracking-tighter'>
                            {new Date(transactionView.transactionTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleClosePrompt} className='h-full pt-5 flex items-start'><img src={exit} className='w-[1.8vw] h-[1.8vw]' /></button>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <div className='w-full flex justify-between items-end'>
                    <h1 className='text-[1vw] text-darkp font-bold tracking-tighter'>Items Ordered:</h1>
                  </div>
                  <div className='w-full h-[60vh] flex flex-col drop-shadow'>
                    <div className='h-[6vh] bg-darkp opacity-80 border border-darkp rounded-t-2xl text-white text-[0.8vw] flex justify-between items-center px-10'>
                      <h1 className='w-[19%] text-[0.7vw] leading-tight text-center'>Product</h1>
                      <h1 className='w-[19%] text-[0.7vw] leading-tight text-center'>Quantity</h1>
                      <h1 className='w-[19%] text-[0.7vw] text-center'>Unit of Measurement</h1>
                      <h1 className='w-[19%] text-[0.7vw] leading-tight text-center'>Unit Price</h1>
                      <h1 className='w-[19%] text-[0.7vw] leading-tight text-center'>Amount</h1>
                    </div>
                    <div className='w-full h-full bg-white border-x rounded-b-2xl border-b border-darkp overflow-auto'>
                      {transactionItems
                        .filter(item => item.transactionID === transactionView.id)
                        .map(item => {
                          const product = products.find((p) => String(p.id) === String(item.productID));

                          if (product) {
                            console.log('Found Product:', product); // Log product details to verify
                          } else {
                            console.warn(`Product with ID ${item.productID} not found`);
                          }

                          return (
                            <div key={item.id} className='w-full border-b border-darkp text-darkp text-center flex items-center justify-between px-10 py-2'>
                              <h1 className='w-[19%] text-[0.7vw] leading-tight text-center'>{product ? product.name : 'Unknown Product'}</h1>
                              <h1 className='w-[19%] text-[0.7vw] text-center'>{item.quantity}</h1>
                              <h1 className='w-[19%] text-[0.7vw] text-center'>{item.unitMeasurement}</h1>
                              <h1 className='w-[19%] text-[0.7vw] text-center'>{item.price}</h1>
                              <h1 className='w-[19%] text-[0.7vw] text-center'>{item.productTotal}</h1>
                            </div>
                          );
                      })}
                    </div>
                  </div>
                  <div className='w-full h-[12vh] rounded-2xl flex flex-col drop-shadow bg-darkp opacity-80'>
                    <div className='w-full h-full flex px-10 justify-between items-center text-white font-bold tracking-tighter'>
                      <h1 className='text-2xl'>Total Amount:</h1>
                      <h1 className='text-2xl'>Php {transactionView.amountDue}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Transaction