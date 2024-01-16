const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

const  Messages = mongoose.model('Messages',messageSchema);

module.exports = Messages;