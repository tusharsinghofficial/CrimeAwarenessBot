const mongoose = require('mongoose');

const sendReportSchema = new mongoose.Schema({
    reportId:{
        type:String,
        required:true
    }
},{timestamps:true});


module.exports= mongoose.model('sentReports',sendReportSchema);