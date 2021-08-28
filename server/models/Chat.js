const mongoose = require('mongoose');

//CREATING A SCHEMA TO STORE CHATS-
//THE CHATS HAVE A RECIEVING TYPE TO DIFFERENTIATE BETWEEN THE MESSAGES SENT BY THE USER AND THE MESSAGES SENT BY THE BOT
const chatSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    recievingType:{
        type:String,
        required:true
    }
},{ timestamps: true })

//THIS IS A UNIQUE WAY TO CREATE SEPARATE DATABASE FOR THE USER
module.exports = getContactSchema = (data)=>{

    const chatModel = mongoose.model(`${data}-ChatDB`,chatSchema);
    return chatModel;
}
