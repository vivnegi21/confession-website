import { useEffect } from 'react';
import './App.css';
import {Link} from 'react-router-dom'
function App() {
  useEffect(()=>{
    document.title="Confession's world";
  },[])
  return (
    <div className="">
      <nav className="w-full flex justify-between px-4 py-4 z-10 border-b border-blue-500 fixed top-0 left-0 bg-blue-700/90 text-white ">
        <div className='italic font-bold text-white md:text-3xl text-nowrap items-center '>
          Confession's <span className=''>World</span>
        </div>
        <div className='flex gap-4 items-center px-4'>
          <div className='sm:hover:scale-150 duration-100 ease-in delay-75 active:underline'><a href='#home' className=''>Home</a></div>
          <div className='sm:hover:scale-150 duration-100 ease-in delay-75 active:underline'><a href='#about' className=''>About</a></div>
        </div>
      </nav>


      <div className="py-4 flex px-4 max-sm:flex-col sm:justify-between h-screen items-center" id='home'>
        <div className='flex flex-col text-3xl justify-center items-start my-auto'>
          Welcome to
          <span className='text-blue-800 sm:text-5xl text-nowrap'>Confession's World</span>
          <p className='max-sm:text-xs text-2xl'>Share your thoughts, feelings and experiences.</p>
          <Link to={'/signup'} className='bg-blue-700 text-white px-4 py-3 rounded-xl my-2 text-base'>
            Get Started
          </Link>
        </div>
        <div className=' h-fit flex items-center my-10 justify-center'>
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/5eeea355389655.59822ff824b72.gif" alt="w-full h-fit border" />
        </div>
      </div>
      <div className="h-fit sm:grid sm:grid-cols-2 px-5  " id='about'>
        <div className='flex items-center'>
          <img src="https://i.pinimg.com/originals/50/78/a0/5078a05eb1b6847d93383eaa4c0ed500.gif" alt="abotus" />
        </div>
        <div className='px-6 py-8 text-center bg-blue-700 rounded-2xl text-white mb-10'>
          <img src="/confessions_world.png" alt="" />
          <h1 className='font-bold text-5xl mt-10'>About  Us</h1>
          <p className='mt-10 text-lg px-4 text-start text-wrap'>Our mission is simple -
            to provide a platform where people can share their confessions without fear of judgment or repercussions,
            successes, failures, hopes, dreams, and everything in between. Whether you are
            looking for support from others who understand what you&apos;re going through, or simply
            want to share your story with the world, we invite you to join us on this journey
            together.</p>
        </div>
      </div>
      <footer className='bg-blue-700/50 h-16'>
        
      </footer>
    </div>
  );
}

export default App;
