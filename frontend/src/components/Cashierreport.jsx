// InventoryReport.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CashierReport = () => {

    const [startCashCounts, setStartCashCounts] = useState([]);
    const [endCashCounts, setEndCashCounts] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const fetchStartCashCounts = () => {
        axios.get('http://127.0.0.1:8000/startCashCount')
          .then(response => {
            setStartCashCounts(response.data);
            console.log(response.data)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    };

    const fetchEndCashCounts = () => {
        axios.get('http://127.0.0.1:8000/endCashCount/')
            .then(response => {
                setEndCashCounts(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const fetchTransactions = () => {
        axios.get('http://127.0.0.1:8000/transaction/')
            .then(response => {
                setTransactions(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {``
        console.log('Fetching data...');
        fetchStartCashCounts();
        fetchEndCashCounts();
        fetchTransactions();
    }, []);

    const [terminalOne, setTerminalOne] = useState({
        date: '',
        expectedCash: 0,
        actualCash: 0,
        varianceAmount: 0,
    });

    const [terminalTwo, setTerminalTwo] = useState({
        date: '',
        expectedCash: 0,
        actualCash: 0,
        varianceAmount: 0,
    });

    const [terminalThree, setTerminalThree] = useState({
        date: '',
        expectedCash: 0,
        actualCash: 0,
        varianceAmount: 0,
    });

    const [filterDate, setFilterDate] = useState("");

    useEffect(() => {
        console.log('Filter date changed:', filterDate);  // Log the filter date when it changes
        calculateTerminalData();
    }, [filterDate]);    
    
    const calculateTerminalData = () => {
        // Helper function to get start cash for a terminal on the given date
        const getStartCash = () => {
            const startCash = startCashCounts.find(
                count => 
                // count.dateToday === filterDate &&
                count.terminalIssued === "one"
            );
            console.log(startCash)
            return startCash ? parseFloat(startCash.amountTotal || 0) : 0;
        };
    
        // Helper function to get total transaction amounts for a terminal on the given date
        // const getTotalTransactionAmount = (terminal) => {
        //     return transactions
        //         .filter(tx => tx.date === filterDate && String(tx.terminalIssued) === String(terminal))
        //         .reduce((sum, tx) => sum + parseFloat(tx.finalAmount || 0), 0);
        // };
    
        // Helper function to get the end cash for a terminal on the given date
        // const getEndCash = (terminal) => {
        //     const endCash = endCashCounts.find(
        //         count => count.dateToday === filterDate && String(count.terminalIssued) === String(terminal)
        //     );
        //     return endCash ? parseFloat(endCash.amountTotal || 0) : 0;
        // };
    
        // Calculate data for terminal ONE
        const terminalOneExpectedCash = getStartCash() ;
        // const terminalOneActualCash = getEndCash("One") + getTotalTransactionAmount("One");
        // const terminalOneVariance = terminalOneExpectedCash - terminalOneActualCash;
        
        setTerminalOne({
            date: filterDate,
            expectedCash: terminalOneExpectedCash,
            // actualCash: terminalOneActualCash,
            // varianceAmount: terminalOneVariance,
        });
    
        // Calculate data for terminal TWO
        // const terminalTwoExpectedCash = getStartCash("Two") + getTotalTransactionAmount("Two");
        // const terminalTwoActualCash = getEndCash("Two");
        // const terminalTwoVariance = terminalTwoExpectedCash - terminalTwoActualCash;
        
        // setTerminalTwo({
        //     date: filterDate,
        //     expectedCash: terminalTwoExpectedCash,
        //     actualCash: terminalTwoActualCash,
        //     varianceAmount: terminalTwoVariance,
        // });
    
        // Calculate data for terminal THREE
        // const terminalThreeExpectedCash = getStartCash("Three") + getTotalTransactionAmount("Three");
        // const terminalThreeActualCash = getEndCash("Three");
        // const terminalThreeVariance = terminalThreeExpectedCash - terminalThreeActualCash;
        
        // setTerminalThree({
        //     date: filterDate,
        //     expectedCash: terminalThreeExpectedCash,
        //     actualCash: terminalThreeActualCash,
        //     varianceAmount: terminalThreeVariance,
        // });
    };

    return (
        <div className='flex flex-wrap justify-start items-center gap-5'>
            <div className='w-fit flex flex-col gap-3'>
                <div className='flex gap-2 items-end'>
                    <div className='flex flex-col'>
                        <label className='text-[0.6vw] text-darkp py-1'>Date:</label>
                        <input
                            type='date'
                            name='filterDate'
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button'
                        />
                    </div>
                </div>
            </div>
            <div className='flex gap-7'>
                <div className='mt-2 flex flex-col gap-2'>
                    <div className="h-[55vh] w-[80vw] bg-darkp opacity-80 rounded-2xl flex flex-col overflow-hidden">
                        <h1 className="text-[1.2vw] font-bold tracking-tight text-white p-4">Cash Variance</h1>
                        <div className="overflow-y-auto mt-2 max-h-full">
                            <table className="table-auto w-full text-white">
                                <thead className="sticky top-[-1px] text-[0.8vw] bg-white text-darkp border-y border-white z-10">
                                    <tr>
                                        <th className="w-[22%] px-8 py-2 text-left">Terminal #</th>
                                        <th className="w-[22%] px-8 py-2 text-left">Date</th>
                                        <th className="w-[22%] px-8 py-2 text-left">Expected Cash</th>
                                        <th className="w-[22%] px-8 py-2 text-left">Actual Cash</th>
                                        <th className="w-[22%] px-8 py-2 text-left">Variance Amount</th>
                                    </tr>
                                </thead>
                                <tbody className='text-[0.7vw]'>
                                    <tr className='border-white border-t'>
                                        <td className="w-[22%] px-8 py-4">Terminal 1</td>
                                        <td className="w-[22%] px-8 py-4">{filterDate}</td>
                                        <td className="w-[22%] px-8 py-4">{terminalOne.expectedCash}</td>
                                        <td className="w-[22%] px-8 py-4">{terminalOne.actualCash}</td>
                                        <td className="w-[22%] px-8 py-4">{terminalOne.varianceAmount}</td>
                                    </tr>
                                    <tr className='border-white border-t'>
                                        <td className="w-[22%] px-8 py-4">Terminal 2</td>
                                        <td className="w-[22%] px-8 py-4">{filterDate}</td>
                                        <td className="w-[22%] px-8 py-4">{terminalTwo.expectedCash}</td>
                                        <td className="w-[22%] px-8 py-4">{terminalTwo.actualCash}</td>
                                        <td className="w-[22%] px-8 py-4">{terminalTwo.varianceAmount}</td>
                                    </tr>
                                    <tr className='border-white border-t'>
                                        <td className="w-[22%] px-8 py-4">Terminal 3</td>
                                        <td className="w-[22%] px-8 py-4">{filterDate}</td>
                                        <td className="w-[22%] px-8 py-4">{terminalThree.expectedCash}</td>
                                        <td className="w-[22%] px-8 py-4">{terminalThree.actualCash}</td>
                                        <td className="w-[22%] px-8 py-4">{terminalThree.varianceAmount}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CashierReport;