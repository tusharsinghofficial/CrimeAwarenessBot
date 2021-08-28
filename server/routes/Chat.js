//IMPORTING ROUTES
const verify = require('./VerifyToken');
const router = require('express').Router();


//IMPORTING MODELS
const reportModel = require('../models/Report');
const chatModelFunction = require('../models/Chat');

//GETTING ALL THE CHATS OF THE USER
router.get('/getChat', verify, async (req, res) => {

    const chatModel = chatModelFunction(req.user._id);

    const getChats = await chatModel.find();

    res.send(getChats);
})

//POSTING ALL THE CHATS OF THE USER
router.post('/postChat', verify, async (req, res) => {

    const chatModel = chatModelFunction(req.user._id);

    const gotChat = new chatModel({
        text: req.body.text,
        recievingType: "user"
    })

    try {

        //GETS THE LAST CHAT THAT WAS SAVED IN ORDER TO COMPARE IF THE UPCOMING MESSAGE IS A REPORT AND NOT SIMPLE CHAT MESSAGE
        const lastChat = await chatModel.find().sort({ createdAt: -1 }).limit(1);
        const savedChat = await gotChat.save();
        if (lastChat[0].text == '/report') {
            //IF IT IS A REPORT CREATE ADD IT TO THE REPORT MODEL
            const reportCreated = new reportModel({
                report: req.body.text
            })
            try {
                const reportSaved = await reportCreated.save();
                res.send(reportSaved);
                return;
            }
            catch (errr) {
                console.log(err);
            }
        }
        res.send(lastChat[0].text);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;