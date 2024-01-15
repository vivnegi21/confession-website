import React, { useState } from 'react'
import { FaRegUserCircle } from "react-icons/fa";

const MessageCard = ({ message }) => {
  const [show, setShow] = useState(false);
  return (
    <div className=' flex flex-col card1 hover:text-white px-3 py-2 w-11/12 mx-auto justify-between gap-2 font-sans min-h-fit border bg-white/70 rounded-lg '>
      <div className='flex gap-2 items-center'>
      <FaRegUserCircle className='text-gray-500' />
      <p className='text-gray-500'>Anonymous User</p>
      </div>
      <h2 className=''>
        {show ? message.message : `${message.message.substring(0, 250)}`}
        {
          (message.message !== message.message.substring(0, 250)) && (
            <button className="text-blue-700" onClick={() => setShow(!show)}>Show {show ? "Less" : "More"}</button>)
        }
      </h2>
      <p className='text-base text-gray-500 text-end font-sans'>{new Date(message.createdAt).toLocaleString()}</p>
      <div class="go-corner" href="#">
      <div class="go-arrow">
        →
      </div>
    </div>
    </div>
  )
}

export default MessageCard