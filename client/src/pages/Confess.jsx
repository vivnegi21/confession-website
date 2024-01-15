import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const BASE_URL = 'https://confession-website-api.onrender.com';

const Confess = () => {
  const [confession, setCon] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`${BASE_URL}/addconfession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        confession: confession
      }),
      credentials: 'include'
    }).then(res => {
      res.json();
      setOpen(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    });
  }
  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }
  return (
    <div className='flex z-10'>
      <div className='w-full flex justify-center max-w-lg my-16 sm:mx-auto mx-2   '>
        <div className='backdrop-blur-sm flex flex-col gap-6 border  px-4 py-5 rounded-xl h-fit bg-[#f2f8f9] shadow-lg'>
          <h1 className='text-2xl italic font-sans text-center'>Confess Anonymous</h1>
          <form action="" method="post" onSubmit={handleSubmit}>
            <label >Message</label>
            <textarea name="confession" id="" cols="30" rows="15" className='my-3' value={confession} onChange={(e) => setCon(e.target.value)} />
            <button className='primary bg-blue-700'>Submit</button>
          </form>

        </div>
      </div>
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Anonymous Confession Uploaded!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Confess