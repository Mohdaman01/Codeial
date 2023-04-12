const express = require('express');

const Router = express.Router();

const home_controller = require('../controllers/home_controller');

console.log(`Router loaded`);

Router.get('/',home_controller);

Router.use('/user',require('./users'));

module.exports = Router;