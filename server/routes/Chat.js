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


//CREATING EXPECTED RESPONSES
const greetings = ['Hello', 'Hii', 'Hi', 'Hey', 'Yo', 'Start'];

//POSTING ALL THE CHATS OF THE USER
router.post('/postChat', verify, async (req, res) => {

    const chatModel = chatModelFunction(req.user._id);

    const gotChat = new chatModel({
        text: req.body.text,
        sender: "user"
    });
    
    var chatBotMessage = ' ';
    try {

        //GETS THE LAST CHAT THAT WAS SAVED IN ORDER TO COMPARE IF THE UPCOMING MESSAGE IS A REPORT AND NOT SIMPLE CHAT MESSAGE
        const lastChat = await chatModel.find({sender:"user"}).sort({ createdAt: -1 }).limit(1);

        //SAVING THE MESSAGE SENT
        const savedChat = await gotChat.save();

        if (greetings.includes(req.body.text)) {

            res.send('Hello! back to you. How may I help you. \n If you want to send a report then proceed with the command \n \\report.');

            chatBotMessage='Hello! back to you. How may I help you. \n If you want to send a report then proceed with the command \n \/report.';
            const botChat = new chatModel({
                text:chatBotMessage,
                sender:"bot"
            })
            const savedBotChat = await botChat.save();
            return;

        }
        else if (req.body.text == '/report') {
           
            res.send('Send your report in the follwing format to ensure good quality report. \n \<Location Description\> \n <Bref Description of Report> \n \<Your name\(This is optional)\> \n <Your phone number\(This is optional\)\>');

            chatBotMessage='Send your report in the follwing format to ensure good quality report. \n \<Location Description\> \n <Bref Description of Report> \n \<Your name\(This is optional)\> \n <Your phone number\(This is optional\)\> \n \n All this should be wrapped in one paragraph';
            const botChat = new chatModel({
                text:chatBotMessage,
                sender:"bot"
            })
            const savedBotChat = await botChat.save();
            return;

        }
        //CHECKING IF LAST MESSAGE WAS REPORT
        else if (lastChat[0].text == '/report') {

            //IF IT IS A REPORT CREATE ADD IT TO THE REPORT MODEL
            const reportCreated = new reportModel({
                report: req.body.text
            })
            chatBotMessage='Your report has been successfully saved and sent! Thank you for making the world a better place. It\'s people like you who make a difference!!';
            const botChat = new chatModel({
                text:chatBotMessage,
                sender:"bot"
            })
            try {
                const reportSaved = await reportCreated.save();
            const savedBotChat = await botChat.save();
                res.send(chatBotMessage);
                return;
            }
            catch (errr) {
                console.log({error:errr});
            }
        }
        else{
            res.send('This command is not recognized by me sorry! I am still new to this world. Try something else \n PS:- Try greeting me');
            chatBotMessage='This command is not recognized by me sorry! I am still new to this world. Try something else \n PS:- Try greeting me';
            const botChat = new chatModel({
                text:chatBotMessage,
                sender:"bot"
            })
            const savedBotChat = await botChat.save();
            return;
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;