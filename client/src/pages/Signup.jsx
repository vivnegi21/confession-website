import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Alert, Snackbar } from '@mui/material';

const Signup = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    if (user) {
        navigate('/dashboard')
    }
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    function handleChange(e) {
        e.preventDefault();
        setFormData((data) => {
            return { ...data, [e.target.name]: e.target.value };
        });
    }

    //if signed-in
    useEffect(() => { }, []);
    const [message, setMessage] = useState('');
    function signUser(e) {
        e.preventDefault();
        if (formData.name === '' || formData.email === '' || formData.password === '') {
            setMessage("Please fill out all fields.");

        } else {
            setMessage('');
            fetch('https://confessions-website-5bvg.onrender.com/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }).then((res) => {
                if (res.ok) {
                    setOpen(true);
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                } else {
                    setMessage('Email already in use')
                }
            })
        }
    }
    const [open, setOpen] = useState(false);
    function handleClose(){
        setOpen(false);
    }

    return (
        <div className='bg-no-repeat bg-auto bg-top blur-none' style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1621091211034-53136cc1eb32?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }
        }>
            <div className="py-4 flex px-4 max-sm:flex-col sm:justify-between h-screen items-center" id='home'
            >
                <div className='flex flex-col text-3xl justify-center items-start my-auto sm:text-white'>
                    Welcome to
                    <span className='sm:text-5xl text-nowrap'>Confession's World</span>
                    <p className='max-sm:text-xs text-2xl'>Let's do quick Signup!</p>
                </div>
                <div className='rounded-xl sm:pl-52 w-fit'>
                    <div className='max-w-md sm:ml-10 border rounded-xl px-3  bg-white/50 py-10'>
                        <p className='text-3xl text-center italic text-blue-700'>Sign Up Here</p>
                        <form action="POST" onSubmit={signUser} className=''>
                            <label >Name:</label>
                            <input type="text" name="name" id="" value={formData.name} placeholder='John Doe' onChange={handleChange} />
                            <label >Email:</label>
                            <input type="email" name="email" id="" value={formData.email} placeholder='john@doe.in' onChange={handleChange} />
                            <label >Password:</label>
                            <input type="password" name="password" id="" value={formData.password} onChange={handleChange} />
                            <button className='primary mt-2 bg-blue-700'>SignUp</button>
                        </form>

                        <div className='text-gray-800 mt-10 text-center'>
                            <p className={`${message === "" && "hidden"} text-red-500 text-center`}>{message}</p>
                            Already Have an Account? <Link to={'/login'} className='text-black underline'>Login Now</Link>
                        </div>
                    </div>
                </div>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        User SignUp, Please Login With Credentials!
                    </Alert>
                </Snackbar>

            </div>
        </div>
    )
}

export default Signup