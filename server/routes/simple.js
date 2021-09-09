const router = require('express').Router();

router.get('/simple',(req,res)=>{
    res.send("This works pretty good")
})

module.exports = router;
