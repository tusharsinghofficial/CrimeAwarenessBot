const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    }
},{ timestamps: true })

module.exports = getContactSchema = (data)=>{

    const chatModel = mongoose.model(`${data}-ChatDB`,chatSchema);
    return chatModel;
}
