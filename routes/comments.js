const express = require('express');
const router = express.Router();
const Comment = require('../controllers/comments_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,Comment.create);

module.exports = router;