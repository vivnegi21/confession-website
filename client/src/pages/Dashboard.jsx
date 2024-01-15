import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext.jsx'
import MessageCard from '../components/MessageCard.jsx';
const BASE_URL = 'https://confessions-website-5bvg.onrender.com'
const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  if (user===null) {
    navigate('/')
  }
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/messages`,
      { method: "GET", headers: { "Content-Type": "application/json" }, credentials: 'include' },)
      .then((response) => response.json()).then(data => setMessages([...data]));
  }, [])
  return (
    <div className='min-h-screen'>
      <div className='h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-5 mt-5 md:px-5 -z-40  '>
      {messages.length > 0 && messages.map((message, id) => (

        <MessageCard message={message} />

      ))
      }</div>
    </div>
  )
}

export default Dashboard