import React, { useState } from 'react';
import Logo from '../assets/4U.png';
import bg from '../assets/bg.jpg';

const Login = () => {
    const [terminalNumber, setTerminalNumber] = useState('');
    const [password, setPassword] = useState('');

    // Hardcoded credentials
    const credentials = {
        terminals: [
            { terminalNumber: '001', password: 'pass1' },
            { terminalNumber: '002', password: 'pass2' },
            { terminalNumber: '003', password: 'pass3' },
        ],
        admin: { password: 'admin' },
    };

    const handleLogin = () => {
        if (!password) {
            alert("Please enter your password.");
            return;
        }
        if (!terminalNumber) {
            alert("Please enter terminal number.");
            return;
        }

        const validTerminalNumbers = ['001', '002', '003', 'admin'];
        if (!validTerminalNumbers.includes(terminalNumber)) {
        alert("Invalid terminal number!");
        return;
         }
    
        // Check if password belongs to a cashier
        if (['pass1', 'pass2', 'pass3'].includes(password)) {
            localStorage.setItem('userRole', 'cashier'); // Save role in localStorage
            alert("Login successful! Welcome, Cashier.");
            window.location.href = '/scanner'; // Redirect to scanner
            return;
        }
    
        // Check if password belongs to admin
        if (password === 'admin') {
            localStorage.setItem('userRole', 'admin'); // Save role in localStorage
            alert("Login successful! Welcome, Admin.");
            window.location.href = '/inventory'; // Redirect to inventory
            return;
        }
    
        alert("Invalid Password.");
    };
    

    return (
        <div className='h-screen w-screen font-poppins bg-cover' style={{ backgroundImage: `url(${bg})` }}>
            <div className='h-full w-full flex flex-col gap-5 justify-center items-center'>
                <div className='flex flex-col gap-5 justify-center items-center'>
                    <img src={Logo} className='w-1/12' alt="Logo" />
                    <h1 className='text-5xl text-darkp font-poppins font-bold tracking-tighter mb-5'>WELCOME BACK!</h1>
                </div>
                <div className='w-1/3 flex flex-col items-start gap-5'>
                    <div className='w-full flex flex-col gap-5'>
                        <div className='w-full flex flex-col gap-2'>
                            <label className='text-sm'>Terminal #:</label>
                            <input
                                type="text"
                                placeholder="> Input your Terminal Number Here"
                                className='text-xs bg-transparent border border-gray-300 rounded-md p-4 w-full outline-none'
                                value={terminalNumber}
                                onChange={(e) => setTerminalNumber(e.target.value)}
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <label className='text-sm'>Password:</label>
                            <input
                                type="password"
                                placeholder="> Input your Password Here"
                                className='text-xs bg-transparent border border-gray-300 rounded-md p-4 w-full outline-none'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleLogin}
                    className='w-1/3 border border-black text-black text-sm p-4 rounded-md mt-4 hover:bg-darkp hover:text-white hover:border hover:border-white button'
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default Login;
  