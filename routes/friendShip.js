const express = require('express');
const router = express.Router();
const friendShip_contoller = require('../controllers/friendShip_controller');

router.post('/request', friendShip_contoller.request);
router.post('/accept-request', friendShip_contoller.accept_request);

module.exports = router;