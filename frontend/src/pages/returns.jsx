import React from 'react'
import bg from '../assets/bg.jpg'
import Sidebar from '../components/sidebar'

const returns = () => {
  return (
    <div className='w-screen h-screen bg-cover bg-center flex font-poppins' style={{ backgroundImage: `url(${bg})` }}>
      <Sidebar/>
    </div>
  )
}

export default returns