// A WORK IN PROGRESS

//IMPORING PACKAGES AND MODELS
const nodemailer  = require('nodemailer');
const reportModel = require('../models/Report')
const sentReportModel = require('../models/sentReport');
const express = require('express');
const dotenv = require('dotenv');


dotenv.config({path: '/home/prakharojha/Desktop/ME/CrimeAwarenessBot/server/.env'});

const app = express();


//SETTING UP A MONGOOSE CONNECTION
const mongoose = require('mongoose');
try {
    mongoose.connect(process.env.MONGO_URI,()=>{
        console.log("Done setting up the Database!");
        gettingReport();
    })
} catch (error) {
    console.log(process.env.MONGO_URI);
}


//ASYNC FUNCTION TO GET REPORT
const gettingReport = async ()=>{
const getReports =await reportModel.find();
for(i of getReports){
    console.log(i.report);
    if(await sentReportModel.findOne({reportId:i._id})){
        console.log('This report is done!');
        continue;
    }
    const sendReport = new sentReportModel({
        reportId:i._id
    })
    const sentReportSaved = await sendReport.save();
    sendMailFunction(i.report);
    console.log(sentReportSaved);
}
gettingReport();
}



//SENDING MAIL VIA NODEMAILER
const sendMailFunction = (body)=>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"prakhar.ojha@cmselearning.org",
            pass:'ayush1234'
        }
    });
    
    //THE MAIL SETTING,SUBJECT AND BODY
    const mailOptions = {
        from:'prakhar.ojha@cmselearning.org',
        //THE TO SPACE SHOULD BE FILLED BY THE CORCERNED AUTHORITY EMAIL
        to:'prakharojha12@gmail.com',
        subject:'Sending Email!',
        text:body
    }
    
    //SEND OUT THE MAIL!
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err)
        console.log(err);
        else
        console.log('Email Sent:' + info.response)
    })
}



app.use(4000,()=>{
    console.log('Email Script running on port 4000!');
})