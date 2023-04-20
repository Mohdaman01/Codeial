const express = require('express');
const passport = require('passport');

const router = express.Router();

const users_controller = require('../controllers/user_controller');

router.get('/',users_controller);
router.get('/user-signin',users_controller.signin);
router.get('/user-signup',users_controller.signup);
router.get('/profile',passport.checkAuthentication,users_controller.profile);
router.post('/create',users_controller.create_user);

// use passport as a middleware to authenicate

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/user-signin'}
),users_controller.create_session);

// logout user 

router.get('/logout-user',users_controller.destroySession);



module.exports  = router;