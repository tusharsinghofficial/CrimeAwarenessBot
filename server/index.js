const express = require('express');

const app = express();

//TELLING EXPRESS TO USE BODY PARSER
app.use(express.json());


//DOTENV TO USE ENV FILES
const dotenv = require('dotenv');
dotenv.config();


//IMPORTING MONGOOSE AND CONNECTING TO THE DATABASE
const mong = require('mongoose');
mong.connect(process.env.MONGO_URI,()=>{
    console.log('Connected to DB!');
})


//IMPORTING ALL THE ROUTES
const authRoute = require('./routes/auth');
const ChatRoute = require('./routes/Chat');

//USING THE ROUTES IN EXPRESS
app.use('/api/user',authRoute);
app.use('/api/Chat',ChatRoute);


//STARTING A PORT TO LISTEN TO FOR THE SERVER
app.listen(3000,()=>{
    console.log('App running on Port 3000!');
})