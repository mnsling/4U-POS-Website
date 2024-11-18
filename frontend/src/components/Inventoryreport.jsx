import React, { useState } from 'react';
import coin from '../assets/coin.png';
import transaction from '../assets/transaction.png';
import rev from '../assets/revenue-growth.png';
import disc from '../assets/discount.png';

const Card = ({ icon, amount, label }) => (
    <div className='h-[11vh] w-[17vw] bg-darkp opacity-80 rounded-2xl flex'>
        <div className='p-4 m-4 h-fit w-fit rounded-lg bg-darkp2'>
            <img src={icon} className='w-[2vw]' alt={label} />
        </div>
        <div className='flex flex-col justify-start pt-5 leading-7'>
            <p className='text-[1.5vw] font-bold tracking-tight text-white'>{amount}</p>
            <h1 className='text-[0.7vw] font-medium tracking-tight text-white'>{label}</h1>
        </div>
    </div>
);

const InventoryReport = () => {
    const data = [
        {
            id: '001',
            name: 'Coca-Cola 500ml',
            category: 'Beverages',
            stockLevel: 150,
            unitPrice: 30.0,
            totalValue: 4500.0,
            stockIn: 50,
            stockOut: 20,
            currentStock: 150,
            supplier: 'Coca-Cola',
            reorderLevel: 50,
            lastRestocked: '2024-11-10',
        },
        {
            id: '002',
            name: "Lay's Chips",
            category: 'Snacks',
            stockLevel: 100,
            unitPrice: 45.0,
            totalValue: 4500.0,
            stockIn: 30,
            stockOut: 40,
            currentStock: 100,
            supplier: 'PepsiCo',
            reorderLevel: 30,
            lastRestocked: '2024-11-12',
        },
        {
            id: '003',
            name: 'Toothpaste 100g',
            category: 'Personal Care',
            stockLevel: 75,
            unitPrice: 55.0,
            totalValue: 4125.0,
            stockIn: 20,
            stockOut: 15,
            currentStock: 75,
            supplier: 'Unilever',
            reorderLevel: 20,
            lastRestocked: '2024-11-09',
        },
        {
            id: '004',
            name: 'Milk 1L',
            category: 'Dairy',
            stockLevel: 50,
            unitPrice: 80.0,
            totalValue: 4000.0,
            stockIn: 15,
            stockOut: 10,
            currentStock: 50,
            supplier: 'Nestlé',
            reorderLevel: 15,
            lastRestocked: '2024-11-12',
        },
        {
            id: '005',
            name: 'Laundry Detergent',
            category: 'Household',
            stockLevel: 200,
            unitPrice: 100.0,
            totalValue: 20000.0,
            stockIn: 60,
            stockOut: 40,
            currentStock: 200,
            supplier: 'Procter & Gamble',
            reorderLevel: 50,
            lastRestocked: '2024-11-11',
        },
    ];

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
            <div className='flex gap-5'>
                <Card icon={coin} amount='₱975,800.00' label='Total Stock Value' />
                <Card icon={transaction} amount='35,400 units' label='Total Quantity in Stock' />
                <Card icon={rev} amount='23 items' label='Out of Stock Items' />
                <Card icon={disc} amount='₱150,600.00' label='Total Purchases (last 7 days)' />
            </div>
            <div className="h-[58vh] w-full bg-darkp opacity-80 rounded-2xl flex flex-col overflow-hidden">
                <div className='flex justify-between items-center p-4'>
                    <h1 className="text-xl font-bold tracking-tight text-white">Inventory Details</h1>
                </div>
                <div className="overflow-y-auto mt-2 max-h-full">
                    <table className="table-auto w-full text-white">
                        <thead className="sticky top-[-1px] bg-white text-darkp border-y border-white z-10">
                            <tr className='text-sm'>
                                <th className="px-4 py-2 text-left">Product ID</th>
                                <th className="px-4 py-2 text-left">Product Name</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Stock Level</th>
                                <th className="px-4 py-2 text-left">Unit Price</th>
                                <th className="px-4 py-2 text-left">Total Value</th>
                                <th className="px-4 py-2 text-left">Stock In</th>
                                <th className="px-4 py-2 text-left">Stock Out</th>
                                <th className="px-4 py-2 text-left">Current Stock</th>
                                <th className="px-4 py-2 text-left">Supplier</th>
                                <th className="px-4 py-2 text-left">Reorder Level</th>
                                <th className="px-4 py-2 text-left">Last Restocked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((row, index) => (
                                <tr key={index} className='border-white border-b'>
                                    <td className="px-4 py-4 text-left">{row.id}</td>
                                    <td className="px-4 py-2 text-left">{row.name}</td>
                                    <td className="px-4 py-2 text-left">{row.category}</td>
                                    <td className="px-4 py-2 text-left">{row.stockLevel}</td>
                                    <td className="px-4 py-2 text-left">₱{row.unitPrice.toFixed(2)}</td>
                                    <td className="px-4 py-2 text-left">₱{row.totalValue.toFixed(2)}</td>
                                    <td className="px-4 py-2 text-left">{row.stockIn}</td>
                                    <td className="px-4 py-2 text-left">{row.stockOut}</td>
                                    <td className="px-4 py-2 text-left">{row.currentStock}</td>
                                    <td className="px-4 py-2 text-left">{row.supplier}</td>
                                    <td className="px-4 py-2 text-left">{row.reorderLevel}</td>
                                    <td className="px-4 py-2 text-left">{row.lastRestocked}</td>
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

export default InventoryReport;
