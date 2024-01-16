const express = require('express')
const cors = require('cors');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../models/User.js');
mongoose.connect(process.env.MONGO_URI);
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 8),
        })
        res.json(user);
    } catch (error) {
        res.status(422).json(error);
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    
    if (!userDoc) {
        return res.status(403).json({'ok':false})
    }
    const validPassword = bcrypt.compareSync(password, userDoc.password)
    if (!validPassword) {
        return res.status(401).json({'ok':false});
    }
    jwt.sign({ id: userDoc.id, email: userDoc.email }, process.env.
        SECRET || 'secret_key', {
        expiresIn: '7d'
    }, (err, token) => {
        if (err) throw err;
        res.cookie('token', token, {
            maxAge: 10 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
        }).json({
            'ok':true,
            name:userDoc.name,
            email:userDoc.email
        });
    });
}
const getUser = (req,res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token,process.env.SECRET || 'secret_key',{},async (err,user)=>{
            if(err){
                throw err;
            }
            const { name } = await User.findById(user.id);
            res.json({...user,name});
        })
    }else{
        res.json(null)
    }
}
module.exports = {
    signup,
    login,
    getUser
}