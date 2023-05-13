const express = require('express');
const like_controller = require('../controllers/likes_controller');

const router = express.Router();

router.post('/toggle',like_controller.toggleLikes);

module.exports = router;