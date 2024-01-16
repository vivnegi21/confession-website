const Messages = require('../models/messages.js')
const express = require('express')
const cors = require('cors');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../models/User.js');

const addConfession = (req, res) => {
    const { confession } = req.body;
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.SECRET || 'secret_key', {}, async (err, user) => {
            if (err) {
                throw err;
            }
            const mess = await Messages.create({
                message: confession,
                user: user.id,
                createdAt: new Date(),
            })
            res.status(201).send(mess);

        })
    }
};
const getAllMessages = async (req, res) => {

    const mess = await Messages.find().sort({
        createdAt:
            -1
    });
    const result = mess.map((obj) => {
        return {
            message: obj.message,
            createdAt: obj.createdAt
        }
    })

    res.status(201).send(result);

}
module.exports = {
    addConfession,
    getAllMessages
}