const express = require('express');

const router = express.Router();

const users_controller = require('../controllers/user_controller');

router.get('/',users_controller);
router.get('/user-signin',users_controller.signin);
router.get('/user-signup',users_controller.signup);
router.post('/create',users_controller.create_user);
router.post('/create-session',users_controller.create_session);
router.get('/delete-session',users_controller.delete_session);

router.get('/profile',users_controller.profile);

module.exports  = router;