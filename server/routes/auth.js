const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../Validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//VALIDATION


router.post('/register', async (req, res) => {
    console.log(req.body);

    //VALIDATE
    const { error } = registerValidation(req.body);
    if (error) {
        console.log("Validation Error");
        return res.status(400).send(error.details[0].message);
    }


    //CHECK IF USER ALREADY PRESENT
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).send('Email Already Exists');


    //HASH PASSWORDS

    const salt = await bcrypt.genSalt(10);


    const hashPassword = await bcrypt.hash(req.body.password, salt);




    //CREATE USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        console.log(err);
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body);
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    //CHECK IF USER ALREADY PRESENT
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send("Email Doesn't Exist");

    //PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send('Invalid password');

    //CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

})
module.exports = router;