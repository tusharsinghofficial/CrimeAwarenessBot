//IMPORTING JAVASCRIPT WEB TOKEN
const jwt = require('jsonwebtoken');

//EXPORTING THE FUNCTION TO VERIFY THE TOKEN RECIEVED
module.exports = function (req,res,next){
    //CHECKS IF THE REQUEST MADE HAS THE AUTH-TOKEN AS THE HEADER
    const token = req.header('auth-token');
    //IF NO HEADER PRESENT THEN DIRECT ERROR
    if(!token) return res.status(401).send('Access Denied');

    //IF TOKEN PRESENT THEN VERIFY IF IT IS THE REAL TOKEN
    try {
        const verified =jwt.verify(token,process.env.TOKEN_SECRET);


        //AFTER BEING VERIFIED ADD THIS TO THE REQUEST OBJECT- THIS HELPS AS THE OBJECT NOW CONTAINS THE USER ID WHICH CAN BE USED FOR FURTHER TASKS

        req.user = verified;
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
    //FINALLY PASS ON TO THE NEXT MIDDLE IF ALL THE CODE RUNS AND THERE'S NO ERROR
    next();
}