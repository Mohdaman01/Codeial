const express = require('express');

const router = express.Router();

const users_controller = require('../controllers/user_controller');

router.get('/',users_controller);
router.get('/user-signin',users_controller.signin);
router.get('/user-signup',users_controller.signup);

router.get('/profile',(req,res)=>{
    res.send('<h1>profile accesed</h1>')
})

module.exports  = router;