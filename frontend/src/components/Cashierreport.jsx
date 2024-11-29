// InventoryReport.js
import React, { useState } from 'react';
import coin from '../assets/coin.png';
import disc from '../assets/discount.png';
import rev from '../assets/revenue-growth.png';

const CashierReport = () => {
    // State to control which row is expanded and store descriptions
    const [expandedRow, setExpandedRow] = useState(null);
    const [cashData, setCashData] = useState([
        {
            terminal: 'Terminal 1',
            date: '02-02-2024',
            expected: '₱10,000.00',
            actual: '₱9,800.00',
            variance: '- ₱200.00',
            description: 'mistakenly entered an incorrect amount during a transaction, which was later corrected but led to a discrepancy in the cash count."'
        },
        {
            terminal: 'Terminal 2',
            date: '02-02-2024',
            expected: '₱8,200.00',
            actual: '₱8,200.00',
            variance: '+ ₱0.00',
            description: ''
        },
        {
            terminal: 'Terminal 3',
            date: '02-02-2024',
            expected: '₱12,000.00',
            actual: '₱12,050.00',
            variance: '+ ₱50.00',
            description: 'Overpayment by a customer, corrected in system.'
        }
    ]);

    // Toggle row expansion
    const toggleRow = (index) => {
        setExpandedRow(expandedRow === index ? null : index);
    };

    // Update description on blur event
    const handleDescriptionChange = (index, newDescription) => {
        setCashData((prevData) => {
            const updatedData = [...prevData];
            updatedData[index].description = newDescription;
            return updatedData;
        });
    };

    return (
        <div className='flex flex-wrap justify-start items-center gap-5'>
            <div className='w-fit flex flex-col gap-3'>
                <div className='flex gap-2 items-end'>
                    <div className='flex gap-2'>
                        <div className='flex flex-col'>
                            <label className='text-[0.6vw] text-darkp py-1'>Choose Terminal:</label>
                            <select className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                                <option>All Terminal</option>
                                <option>Terminal 1</option>
                                <option>Terminal 2</option>
                                <option>Terminal 3</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-[0.6vw] text-darkp py-1'>Date:</label>
                        <input type='date' className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp cursor-pointer hover:bg-darkp hover:text-white button' />
                    </div>
                    <button className='bg-darkp text-white text-[0.7vw] px-5 py-2 rounded-lg button'>Enter</button>
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
                                        <th className="px-4 py-2 text-left"></th>
                                        <th className="px-4 py-2 text-left">Terminal #</th>
                                        <th className="px-4 py-2 text-left">Date</th>
                                        <th className="px-4 py-2 text-left">Expected Cash</th>
                                        <th className="px-4 py-2 text-left">Actual Cash</th>
                                        <th className="px-4 py-2 text-left">Variance Amount</th>
                                    </tr>
                                </thead>
                                <tbody className='text-[0.7vw]'>
                                    {cashData.map((data, index) => (
                                        <React.Fragment key={index}>
                                            <tr className='border-white border-t'>
                                                <td className="px-4 py-4 text-center">
                                                    <button
                                                        onClick={() => toggleRow(index)}
                                                        className="text-white"
                                                    >
                                                        {expandedRow === index ? '▲' : '▼'}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-4">{data.terminal}</td>
                                                <td className="px-4 py-4">{data.date}</td>
                                                <td className="px-4 py-4">{data.expected}</td>
                                                <td className="px-4 py-4">{data.actual}</td>
                                                <td className={`px-4 py-4 ${data.variance.startsWith('-') ? 'text-red-300' : 'text-green-300'}`}>
                                                    {data.variance}
                                                </td>
                                            </tr>
                                            {expandedRow === index && (
                                                <tr className='bg-darkp'>
                                                    <label className='font-bold text-[1.2vw] flex justify-center items-start h-full'>REASON:</label>
                                                    <td colSpan="5" className="px-4 py-2">
                                                        <textarea
                                                            className="w-full h-[10vh] bg-darkp text-white p-2 rounded-md border border-white resize-none"
                                                            value={data.description}
                                                            placeholder="Enter reason for discrepancy"
                                                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                                            rows={3}
                                                        />
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
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