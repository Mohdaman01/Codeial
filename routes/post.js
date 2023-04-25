const express = require('express');
const router = express.Router();
const Post = require('../controllers/post_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,Post.create_post);

router.get('/destroy/:id',passport.checkAuthentication,Post.destroy_post);

module.exports = router;