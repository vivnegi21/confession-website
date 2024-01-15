import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { UserContextProvider } from './UserContext.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Confess from './pages/Confess.jsx';
import Layout from './pages/Layout.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Layout />}>
            <Route index element={<Dashboard/>} />
            <Route path='/dashboard/confess' element={<Confess />} />
          </Route>

        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
