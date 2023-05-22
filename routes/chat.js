const express = require('express');

const router = express.Router();

const chat_controller = require('../controllers/chat_controller');

router.get('/global-chat',chat_controller.global_chat);

module.exports = router;