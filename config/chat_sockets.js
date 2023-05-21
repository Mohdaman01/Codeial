
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
        });

        socket.on('join_room', function(data){
          console.log('joinging request rec.', data);

          socket.join(data.chatroom);

          io.in(data.chatroom).emit('user_join', data);
        });

        socket.on('send-message', function(data){
          // console.log(data);
          io.in(data.chatroom).emit('receive-message', data);
        });

    })

}