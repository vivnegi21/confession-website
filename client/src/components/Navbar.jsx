import React, { useContext, useState } from 'react'
import { FaUserTie } from "react-icons/fa6";
import { UserContext } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { TfiWrite } from "react-icons/tfi";
import { GiShatteredHeart } from "react-icons/gi";
const BASE_URL = 'https://confessions-website-5bvg.onrender.com'
const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  if (!user) navigate('/login')
  const [show, setShow] = useState(false);
  function handleLogout(e) {
    fetch(`${BASE_URL}/logout`, { method: 'GET', headers: { 'Content-Type': 'application/json' }, credentials: "include" })
      .then((res) => {
        setUser(null)
        navigate('/')
      })
      .catch(console.error);
  }
  return (
    <nav className="w-full flex justify-between px-4 py-4  border-b border-blue-500 bg-blue-700 backdrop-blur z-50 text-white  ">
      <Link to={'/'} className='italic font-bold text-white md:text-3xl text-nowrap items-center '>
        Confession's <span className=''>World</span>
      </Link>
      <div className='flex gap-4 items-center px-4'>
        <Link className='text-xs text-wrap sm:text-base flex flex-col items-center' title='Make Confession' to={'/dashboard/confess'}>
          <div className='sm:hidden'>
            <TfiWrite className='w-6 h-6' />

          </div>
          <p className='max-sm:hidden flex items-center gap-2'>
          <GiShatteredHeart className='text-pink-500 w-5 h-5' /> Make Confession
          </p>
        </Link>
        <div className='flex gap-4 items-center relative' onClick={() => setShow(!show)}>
          <FaUserTie className='w-6 h-6' />
          <div className={` z-50 sm:w-96 h-96 border absolute rounded-xl bg-white top-0 right-0 mt-14  ${show ? '' : 'hidden'} `}>
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
        </div>
        {/* MOdAL */}
        

    </nav>
  )
}

export default Navbar