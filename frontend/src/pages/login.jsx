import React from 'react';
import Logo from '../assets/4U.png';
import bg from '../assets/bg.jpg'

const Login = () => {
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
                            />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <label className='text-sm'>Password:</label>
                            <input
                                type="password"
                                placeholder="> Input your Password Here"
                                className='text-xs bg-transparent border border-gray-300 rounded-md p-4 w-full outline-none'
                            />
                        </div>
                    </div>
                    <div className='w-full flex justify-between mt-5'>
                        <div className='flex gap-2'>
                            <input
                                type='checkbox'
                                className='flex justify-start items-start'
                            />
                            <h1 className='text-xs tracking-tighter'>Remember Me</h1>
                        </div>
                        <button className='text-xs tracking-tighter hover:underline hover:underline-offset-4'>Forgot Password?</button>
                    </div>
                </div>
                <button className='w-1/3 border border-black text-black text-sm p-4 rounded-md mt-4 hover:bg-darkp hover:text-white hover:border hover:border-white button'>Sign In</button>
            </div>
        </div>
    )
}

export default Login;
