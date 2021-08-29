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
        //Making this a sort of callback function
        gettingReport();
    })
} catch (error) {
    console.log(error);
}


//ASYNC FUNCTION TO GET REPORT
const gettingReport = async ()=>{
    //GET ALL THE REPORTS SAVED IN THE REPORT COLLECTION
const getReports =await reportModel.find();

//LOOP THROUGH THE JSON RESULT OBTAINED
for(i of getReports){

    //CHECK IF THE REPORT IS PRESENT IN THE sentReport COLLECTION
    //THIS IS DONE TO ENSURE THAT THE SAME REPORT IS NOT SENT TWICE
    if(await sentReportModel.findOne({reportId:i._id})){
        continue;
    }

    //CREATING NEW MODEL FOR THE SENT REPORT AND ADD TO THE COLLECTION
    const sendReport = new sentReportModel({
        reportId:i._id
    })
    const sentReportSaved = await sendReport.save();
    sendMailFunction(i.report);
    console.log(sentReportSaved);
}

//MAKING IT CALL ITSELF AGAIN AND AGAIN
gettingReport();
}



//SENDING MAIL VIA NODEMAILER
const sendMailFunction = (body)=>{
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"prakhar.ojha@cmselearning.org",
            pass:process.env.EMAIL_PASSWORD
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