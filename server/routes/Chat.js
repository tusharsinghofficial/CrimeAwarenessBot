const verify = require('./VerifyToken');
const chatModelFunction = require('../models/Chat');
const router = require('express').Router();

const reportModel = require('../models/Report');

router.get('/getChat', verify, async (req, res) => {
    const chatModel = chatModelFunction(req.user._id);
    const getChats = await chatModel.find();
    res.send(getChats);
})

router.post('/postChat', verify, async (req, res) => {
    const chatModel = chatModelFunction(req.user._id);
    const gotChat = new chatModel({
        text: req.body.text,
        recievingType:"user"
    })

    try {
        const lastChat = await chatModel.find().sort({createdAt:-1}).limit(1);
        const savedChat = await gotChat.save();
        if(last[0].text=='/report')
        {
            const reportCreated = new reportModel({
                report:req.body.text
            })
            try{
                const reportSaved = await reportCreated.save();
                res.send(reportSaved);
            }
            catch(errr){
                console.log(err);
            }
        }
       res.send(lastChat[0].text);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;