import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx';
import { Alert, Snackbar } from '@mui/material';

const BASE_URL = 'https://confession-website-api.onrender.com'

const Login = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [message, setMsg] = useState('');
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    //if signed-in
    useEffect(() => {
        if(user){
            navigate('/dashboard');
        }
    }, [user]);
    async function loginUser(e) {
        e.preventDefault();
        setMsg('')
        if (formData.email === '' || formData.password === '') {
            setMsg("Please fill out all fields.");
        } else {
            const userDoc = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: 'include'
            }).then(res => res.json());
            if(!userDoc.ok) setMsg('Invalid Credentials');
            else{
                setUser(userDoc);
                navigate('/dashboard')
            }
        }

    }
    function handleChange(e) {
        e.preventDefault();
        setFormData((data) => {
            return { ...data, [e.target.name]: e.target.value };
        });
    }
    const [open, setOpen] = useState(false);
    function handleClose(){
        setOpen(false);
    }
    return (
        <div className='bg-no-repeat bg-auto bg-bottom blur-none' style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1621091211034-53136cc1eb32?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }
        }>
            <div className="py-4 flex px-4 max-sm:flex-col sm:justify-between h-screen items-center" id='home'
            >
                <div className='flex flex-col text-3xl justify-center items-start my-auto sm:text-white'>
                    Welcome Back
                    <span className='sm:text-5xl text-nowrap max-lg:text-blue-700'>Confession's World</span>
                    <p className='max-sm:text-xs text-2xl'>Happy To see you again!!</p>
                </div>
                <div className='rounded-xl sm:pl-52 w-fit'>
                    <div className='max-w-md sm:ml-10 border rounded-xl px-3  bg-white/70 py-10'>
                        <p className='text-3xl text-center italic text-orange-500'>Sign In Here</p>
                        <form action="POST" onSubmit={loginUser} className=''>
                            <label >Email:</label>
                            <input type="email" name="email" id="" value={formData.email} placeholder='john@doe.in' onChange={handleChange} />
                            <label >Password:</label>
                            <input type="password" name="password" id="" value={formData.password} onChange={handleChange} />
                            <button className='bg-orange-600 primary mt-2 '>SignIn</button>
                        </form>

                        <div className='text-gray-800 mt-2 text-center'>
                            <p className={`${message === "" && "hidden"} text-red-500`}>{message}</p>
                            Don't Already Have an Account? <Link to={'/signup'} className='text-black underline'>Register Now</Link>
                        </div>
                    </div>
                </div>


            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        User Signed in, Ready to confess!
                    </Alert>
                </Snackbar>
        </div>
    )
}

export default Login