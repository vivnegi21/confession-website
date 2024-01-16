const express = require('express')
const cors = require('cors');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/User.js');
const { signup, login, getUser } = require('./controllers/auth.js');

const Messages = require('./models/messages.js');
const { addConfession,getAllMessages } = require('./controllers/message.js');

mongoose.connect(process.env.MONGO_URI);
const app = express();
app.use(express.json());
app.use(cors({
    // origin: true,  // allow to pass any origin
    
    origin: "https://confession-website-flax.vercel.app/",
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(cookieParser());
app.get('/test', (req, res) => {
    res.json({ msg: 'test API working' })
})
// Auth Routes
app.post('/signup', signup)
app.post('/login', login);
app.get('/profile', getUser);
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: "User logged out" });
})


//confessions
app.post('/addconfession',addConfession);
app.get('/messages',getAllMessages);


app.listen(4000, (req, res) => {
    console.log("Server is running on port 4000");
})