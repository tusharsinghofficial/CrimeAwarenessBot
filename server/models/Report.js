const { string } = require('joi');
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    report:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('reports',reportSchema);