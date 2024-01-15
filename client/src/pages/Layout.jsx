import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { UserContext } from '../UserContext.jsx'

const Layout = () => {
  const image = ''
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  if (!user) navigate('/')
  
  return (
    // <div className='flex'>
      <div className='w-full flex flex-col'>
        <div className=''>
          <Navbar />
        </div>
        <div className='bg-fuchsia-100' style={{
          backgroundImage: `url(${image})`,
        }}
        >
          <Outlet/>
        </div>
      </div>
    
  )
}

export default Layout