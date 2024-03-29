import React, { useContext, useState } from 'react'

import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { FaUserTie } from "react-icons/fa6";
import { UserContext } from '../UserContext.jsx';
import { Alert, Snackbar } from '@mui/material';

const BASE_URL = 'https://confession-website-api.onrender.com'
const Layout = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  if (!user) navigate('/')
  if (!user) navigate('/login')
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }
  function handleLogout(e) {
    fetch(`${BASE_URL}/logout`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: "include" })
      .then((res) => {
        setUser(null)
        setOpen(true);
        setTimeout(() => {
          navigate('/')
        }, 2000)
      })
      .catch(console.error);
  }
  return (
    // <div className='flex'>
    <div className='w-full flex flex-col'>
      <div className=''>
        <Navbar show={show} setShow={setShow} />
        <div className={` z-50 sm:w-96 h-96 border absolute rounded-xl bg-gray-700 backdrop-blur-sm top-0 right-0 mt-14 mx-1  ${show ? '' : 'hidden'} `}>
          <div className=' flex flex-col items-center p-4 text-black text-2xl gap-5 z-50'>
            <FaUserTie className='w-40 h-40 rounded-full border-black border-8 text-black z-50' />
            <div className='flex flex-col items-center gap-2 z-50'>
              {user?.name}
              <div className='text-xl z-50'>{user?.email}</div>
            </div>
            <button className='primary bg-blue-700 z-50' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className='bg-[#061327]'>
        <Outlet />
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          User Logged Out! Going to landing page!
        </Alert>
      </Snackbar>
    </div>

  )
}

export default Layout