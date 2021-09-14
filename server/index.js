const express = require('express');

const app = express();
const cors = require('cors')
//TELLING EXPRESS TO USE BODY PARSER
app.use(express.json());
app.use(cors());

//DOTENV TO USE ENV FILES
const dotenv = require('dotenv');
dotenv.config();


//IMPORTING MONGOOSE AND CONNECTING TO THE DATABASE
const mong = require('mongoose');
mong.connect(process.env.MONGO_URI,()=>{
    console.log('Connected to DB!');
})


//IMPORTING ALL THE ROUTES
const simpleRoute = require('./routes/simple');
const authRoute = require('./routes/auth');
const ChatRoute = require('./routes/Chat');

//USING THE ROUTES IN EXPRESS
app.use('/testing',simpleRoute);
app.use('/api/user',authRoute);
app.use('/api/Chat',ChatRoute);


//STARTING A PORT TO LISTEN TO FOR THE SERVER
app.listen(5000,()=>{
    console.log('App running on Port 5000!');
})