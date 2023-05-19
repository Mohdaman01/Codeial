
module.exports.chatSockets = function(socketServer){

    const io = require('socket.io')(socketServer, {
        cors: {
          origin: '*',
        }
      });

    io.on("connection", function(socket){
        console.log('new connection recieved', socket.id);
        
        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        })

    })

}