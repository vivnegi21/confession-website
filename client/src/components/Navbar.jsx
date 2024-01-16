import React from 'react'
import { FaUserTie } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { TfiWrite } from "react-icons/tfi";
import { GiShatteredHeart } from "react-icons/gi";
const Navbar = ({ show, setShow }) => {

  return (
    <nav className="w-full flex justify-between px-4 py-4  border-b-2 border-gray-400  bg-[#101214] backdrop-blur z-50 text-white  ">
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar