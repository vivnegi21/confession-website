import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const BASE_URL = 'https://confession-website-api.onrender.com';

const Confess = () => {
  const [confession, setCon] = useState("");
  const navigate = useNavigate();
  const [msg, setMessage] = useState({
    alert: 'success',
    msg: "Anonymous Message Uploaded"
  })
  function handleSubmit(e) {
    e.preventDefault();
    if (confession === '') {
      setMessage({
        alert: 'info',
        info: 'Empty Message',
      })
      setOpen(true);
    } else {
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
        setMessage({
          alert: 'success',
          msg: "Anonymous Message Uploaded"
        })
        setOpen(true);

        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      });
    }

  }
  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }
  useEffect(() => {
    document.title = 'Confess Your Feelings'
  }, [])
  return (
    <div className='flex z-10'>
      <div className='w-full flex justify-center max-w-lg my-16 sm:mx-auto mx-2   '>
        <div className='backdrop-blur-sm flex flex-col gap-6 border  px-4 py-5 rounded-xl h-fit bg-[#f2f8f9] shadow-lg'>
          <h1 className='text-2xl italic font-sans text-center'>Confess Anonymous</h1>
          <form action="" method="post" onSubmit={handleSubmit}>
            <label >Message</label>
            <textarea name="confession" id="" cols="30" rows="15" className='my-3 p-2' value={confession} onChange={(e) => setCon(e.target.value)} />
            <button className='primary bg-blue-700'>Submit</button>
          </form>

        </div>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={msg.alert} sx={{ width: '100%' }}>
          {msg.info}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Confess