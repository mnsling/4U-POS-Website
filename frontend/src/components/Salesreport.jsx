import React from 'react';
import coin from '../assets/coin.png';
import transaction from '../assets/transaction.png';
import rev from '../assets/revenue-growth.png';
import disc from '../assets/discount.png';
import ref from '../assets/money-back.png';

const Card = ({ icon, amount, label, children }) => (
    <div className='h-[11vh] w-[17vw] bg-darkp opacity-80 rounded-2xl flex'>
        <div className='p-4 m-4 h-fit w-fit rounded-lg bg-darkp2'>
            <img src={icon} className='w-[2vw] h-[2vw]' alt={label} />
        </div>
        <div className='flex flex-col justify-start pt-5 leading-7'>
            <p className='text-[1.2vw] font-bold tracking-tight text-white leading-6'>{amount}</p>
            <h1 className='text-[0.7vw] font-medium pt-3 tracking-tight text-white leading-3'>{label}</h1>
            {children}
        </div>
    </div>
);

const Salesreport = () => {
    const data = [
        { terminal: 1, date: '2024-11-15', sales: 25500.00, cash: 15000.00, discounts: 2000.00, transactions: 50, beginOR: 1001, endOR: 1050 },
        { terminal: 2, date: '2024-11-15', sales: 18300.00, cash: 12500.00, discounts: 1500.00, transactions: 35, beginOR: 2001, endOR: 2035 },
        { terminal: 3, date: '2024-11-15', sales: 12750.00, cash: 9000.00, discounts: 1200.00, transactions: 25, beginOR: 3001, endOR: 3025 },
    ];

    return (
        <div className='w-full flex flex-col gap-5'>
            <div className='w-fit flex flex-col gap-3'>
                <div className='flex gap-2 items-end'>
                    <div className='flex flex-col'>
                        <label className='text-[0.6vw] text-darkp py-1'>Choose Terminal:</label>
                        <select className='py-2 px-4 w-[10vw] text-[0.6vw] bg-white border border-darkp opacity-80 rounded-xl text-darkp hover:bg-darkp hover:text-white cursor-pointer button'>
                            <option>All Terminal</option>
                            <option>Terminal 1</option>
                            <option>Terminal 2</option>
                            <option>Terminal 3</option>
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
            <div className='flex gap-5'>
                <Card icon={coin} amount='₱56,050.00 ' label='Total Sales' />
                <Card icon={transaction} amount='110' label='Total Sales Transactions' />
                <Card icon={rev} amount='₱509.55' label='Average Sales' />
                <Card icon={disc} amount='₱4,700.00' label='Total Discounts' />
                <Card icon={ref} amount='₱400.00' label='Total Refunds' />
            </div>
            <div className="h-[50vh] w-full border border-darkp bg-darkp opacity-80 rounded-2xl flex flex-col overflow-hidden">
                <div className="overflow-y-auto max-h-full hide-scrollbar">
                    <table className="table-auto w-full text-white">
                        <thead className="sticky top-[-1px] text-[0.8vw] bg-white text-darkp border-y border-white z-10">
                            <tr>
                                <th className="px-4 py-2 text-left">Terminal #</th>
                                <th className="px-4 py-2 text-left">Date Range</th>
                                <th className="px-4 py-2 text-left">Daily Sales</th>
                                <th className="px-4 py-2 text-left">Total Cash</th>
                                <th className="px-4 py-2 text-left">Total Discounts</th>
                                <th className="px-4 py-2 text-left">Transaction Count</th>
                                <th className="px-4 py-2 text-left">Beginning OR</th>
                                <th className="px-4 py-2 text-left">Ending OR</th>
                            </tr>
                        </thead>
                        <tbody className=' text-[0.7vw]'>
                            {data.map((row, index) => (
                                <tr key={index} className='border-white border-b'>
                                    <td className="px-4 py-4 text-left">{row.terminal}</td>
                                    <td className="px-4 py-4 text-left">{row.date}</td>
                                    <td className="px-4 py-4 text-left">₱{row.sales.toFixed(2)}</td>
                                    <td className="px-4 py-4 text-left">₱{row.cash.toFixed(2)}</td>
                                    <td className="px-4 py-4 text-left">₱{row.discounts.toFixed(2)}</td>
                                    <td className="px-4 py-4 text-left">{row.transactions}</td>
                                    <td className="px-4 py-4 text-left">{row.beginOR}</td>
                                    <td className="px-4 py-4 text-left">{row.endOR}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Salesreport;