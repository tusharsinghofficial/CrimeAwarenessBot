const mongoose = require('mongoose');

module.exports = getContactSchema = (data)=>{
    const chatSchema = new mongoose.Schema({
        text:{
            type:String,
            required:true
        }
    },{ timestamps: true })

    const chatModel = mongoose.model(`${data}-ChatDB`);
    return chatModel;
}
