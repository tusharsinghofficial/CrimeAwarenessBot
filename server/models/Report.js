const mongoose = require('mongoose');

//DEFINING THE REPORT SCHEMA 
const reportSchema = new mongoose.Schema({
    report:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('reports',reportSchema);