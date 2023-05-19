//setup the chat sever to be used with socket.io
const express = require('express');
const app = express();
 
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);

console.log('chat server is listing on port http://localhost:5000');