import React from 'react';

const Analysisreport = () => {
    const data = [
        { rank: 1, date: '2024-11-15', productid: 1001, name: 'Bottled Water', supplier: 'AquaSupplier', amount: 25500.00, quantity: 1050 },
        { rank: 2, date: '2024-11-14', productid: 1002, name: 'Potato Chips', supplier: 'SnackCo', amount: 20500.00, quantity: 950 },
        { rank: 3, date: '2024-11-13', productid: 1003, name: 'Instant Noodles', supplier: 'NoodleKing', amount: 18500.00, quantity: 870 },
        { rank: 4, date: '2024-11-12', productid: 1004, name: 'Soft Drinks', supplier: 'FizzCorp', amount: 16500.00, quantity: 820 },
        { rank: 5, date: '2024-11-11', productid: 1005, name: 'Chocolate Bar', supplier: 'ChocoHeaven', amount: 14500.00, quantity: 780 },

    ];

    return (
        <div className='w-full flex flex-col gap-5'>
            <div className='w-fit flex flex-col gap-3'>
                <div className='flex gap-2 items-end'>
                    <div className='flex flex-col'>
                        <label className='text-[0.6vw] text-darkp py-1'>Choose Supplier:</label>
                        <select className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                            <option>All Supplier</option>
                            <option>Supplier 1</option>
                            <option>Supplier 2</option>
                            <option>Supplier 3</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-[0.6vw] text-darkp py-1'>Choose Scope:</label>
                        <select className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                            <option>Best Seller</option>
                            <option>Worst Seller</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-[0.6vw] text-darkp py-1'>Analyzed By:</label>
                        <select className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                            <option>Quantity Sold</option>
                            <option>Total Amount Sold</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-[0.6vw] text-darkp py-1'>Top:</label>
                        <select className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-[0.6vw] text-darkp py-1'>Date Range:</label>
                        <div className='flex gap-2 items-center'>
                            <input type='date' className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button' />
                            <span className='text-[0.6vw] text-darkp'>to</span>
                            <input type='date' className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button' />
                        </div>
                    </div>
                    <button className='bg-darkp text-white text-[0.7vw] px-5 py-2 rounded-lg button'>Enter</button>
                </div>
            </div>
            <div className="h-[57vh] w-full bg-darkp opacity-80 rounded-2xl flex flex-col overflow-hidden">
                <div className='flex justify-between items-center p-4'>
                    <h1 className="text-[1.2vw] font-bold tracking-tight text-white">Best Seller Sales</h1>
                </div>
                <div className="overflow-y-auto mt-2 max-h-full hide-scrollbar">
                    <table className="table-auto w-full text-white">
                        <thead className="sticky top-[-1px] bg-white text-[0.8vw] text-darkp border-y border-white z-10">
                            <tr>
                                <th className="px-4 py-2 text-left">Rank</th>
                                <th className="px-4 py-2 text-left">Date</th>
                                <th className="px-4 py-2 text-left">Product ID</th>
                                <th className="px-4 py-2 text-left">Product Name</th>
                                <th className="px-4 py-2 text-left">Supplier</th>
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Quantity</th>
                            </tr>
                        </thead>
                        <tbody className='text-[0.7vw]'>
                            {data.map((row, index) => (
                                <tr key={index} className='border-white border-b'>
                                    <td className="px-4 py-4 text-left">{row.rank}</td>
                                    <td className="px-4 py-4 text-left">{row.date}</td>
                                    <td className="px-4 py-4 text-left">{row.productid}</td>
                                    <td className="px-4 py-4 text-left">{row.name}</td>
                                    <td className="px-4 py-4 text-left">{row.supplier}</td>
                                    <td className="px-4 py-4 text-left">{row.amount.toFixed(2)}</td>
                                    <td className="px-4 py-4 text-left">{row.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Analysisreport;