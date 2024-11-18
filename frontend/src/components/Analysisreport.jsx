import React, { useState } from 'react';
import coin from '../assets/coin.png';
import transaction from '../assets/transaction.png'
import rev from '../assets/revenue-growth.png'
import disc from '../assets/discount.png'
import ref from '../assets/money-back.png'

const Analysisreport = () => {
    const data = [
        { rank: 1, date: '2024-11-15', productid: 1001, name: 'Bottled Water', category: 'Beverages', supplier: 'AquaSupplier', amount: 25500.00, quantity: 1050 },
        { rank: 2, date: '2024-11-14', productid: 1002, name: 'Potato Chips', category: 'Snacks', supplier: 'SnackCo', amount: 20500.00, quantity: 950 },
        { rank: 3, date: '2024-11-13', productid: 1003, name: 'Instant Noodles', category: 'Grocery', supplier: 'NoodleKing', amount: 18500.00, quantity: 870 },
        { rank: 4, date: '2024-11-12', productid: 1004, name: 'Soft Drinks', category: 'Beverages', supplier: 'FizzCorp', amount: 16500.00, quantity: 820 },
        { rank: 5, date: '2024-11-11', productid: 1005, name: 'Chocolate Bar', category: 'Snacks', supplier: 'ChocoHeaven', amount: 14500.00, quantity: 780 }
    ]



    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    // Calculate the index of the first and last row to be displayed on the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    // Slice the data array to display only the rows for the current page
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / rowsPerPage);

    // Pagination click handler
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='w-full flex flex-col gap-5'>
            <div className='w-fit flex flex-col gap-3'>
                <div className='flex gap-2 items-center'>
                    <input type='date' className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button' />
                    <span className='text-sm text-darkp'>to</span>
                    <input type='date' className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button' />
                </div>
                <div className='flex gap-3 text-darkp'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs px-2'>Supplier:</label>
                        <select className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                            <option>Supplier 1</option>
                            <option>Supplier 2</option>
                            <option>Supplier 3</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs px-2'>Scope:</label>
                        <select className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                            <option>Best Seller</option>
                            <option>Worst Seller</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs px-2'>Analyzed By:</label>
                        <select className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                            <option>Quantity Sold</option>
                            <option>Total Amount Sold</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs px-2'>Top :</label>
                        <div className='flex gap-3'>
                            <select className='py-2 px-4 w-[4vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                                <option>5</option>
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                            </select>
                            <button className='bg-darkp text-white text-sm  px-5 py-2 rounded-lg button'>Enter</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[50vh] w-full bg-darkp opacity-80 rounded-2xl flex flex-col overflow-hidden">
                <div className='flex justify-between items-center p-4'>
                    <h1 className="text-xl font-bold tracking-tight text-white">Best Seller Sales</h1>
                </div>
                <div className="overflow-y-auto mt-2 max-h-full">
                    <table className="table-auto w-full text-white">
                        <thead className="sticky top-[-1px] bg-white text-darkp border-y border-white z-10">
                            <tr>
                                <th className="px-4 py-2 text-left">Rank</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Product ID</th>
                                <th className="px-4 py-2 text-left">Product Name</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Supplier</th>
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((row, index) => (
                                <tr key={index} className='border-white border-b'>
                                    <td className="px-4 py-4 text-left">{row.rank}</td>
                                    <td className="px-4 py-4 text-left">{row.date}</td>
                                    <td className="px-4 py-4 text-left">{row.productid}</td>
                                    <td className="px-4 py-4 text-left">{row.name}</td>
                                    <td className="px-4 py-4 text-left">{row.category}</td>
                                    <td className="px-4 py-4 text-left">{row.supplier}</td>
                                    <td className="px-4 py-4 text-left">{row.amount.toFixed(2)}</td>
                                    <td className="px-4 py-4 text-left">{row.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-start items-center mt-3 px-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-white text-darkp text-sm rounded-lg mr-2"
                        >
                            Previous
                        </button>
                        <span className="text-white text-sm">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-white text-darkp text-sm rounded-lg ml-2"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analysisreport;