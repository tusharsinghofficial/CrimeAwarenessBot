const verify = require('./VerifyToken');
const chatModelFunction = require('../models/Chat');
const router = require('express').Router();

router.get('/getChat', verify,async (req, res) => {
    const chatModel = chatModelFunction(req.user._id);
    const getChats = await chatModel.find();
    res.send(getChats);
})

router.post('/postChat', verify, async (req, res) => {
    const chatModel = chatModelFunction(req.user._id);
    const gotChat = new chatModel({
        text: req.body.text
    })
    try {
        const savedChat = await gotChat.save();
        res.send(savedChat);
    } catch (error) {
        res.status(400).send('Error While Saving');
    }
})

module.exports = router;