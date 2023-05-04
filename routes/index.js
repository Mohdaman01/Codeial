const express = require('express');

const Router = express.Router();

const home_controller = require('../controllers/home_controller');

Router.get('/',home_controller);

Router.use('/users',require('./users'));

Router.use('/posts',require('./post'));

Router.use('/comments',require('./comments'));

Router.use('/api',require('./api'));

module.exports = Router;