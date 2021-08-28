const nodemailer  = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"prakhar.ojha@cmselearning.org",
        pass:'ayush1234'
    }
});

const mailOptions = {
    from:'prakhar.ojha@cmselearning.org',
    to:'prakharojha12@gmail.com',
    subject:'Sending Email!',
    text:"This is Good!"
}

transporter.sendMail(mailOptions,(err,info)=>{
    if(err)
    console.log(err);
    else
    console.log('Email Sent:' + info.response)
})
