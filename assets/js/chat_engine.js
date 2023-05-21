$('#global-chat-toggle').click(()=>{
    $('#user-chat-box').toggle();
})

class chatEngine{
    constructor(chatBoxId,userEmail,userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName;

        this.socket = io('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){

        let self = this;

        this.socket.on('connet', function(){
            console.log('connection established using sockets...! ');  
        });
        
        self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom : 'codeial'
        });

        self.socket.on('user_join', function(data){
                // console.log('a user joined: ', data);
        });

        $('#chat-message-input').keypress(function(e){
            // console.log(e.key);
            if(e.key == 'Enter'){
               let msg = $('#chat-message-input').val();
            // console.log(msg);
            if(msg !=''){
                self.socket.emit('send-message', {
                    message: msg,
                    user_email: self.userEmail,
                    user_name: self.userName,
                    chatroom: 'codeial'
                })
            }
            $('#chat-message-input').val('');
            $('#chat-messages-list').scrollTop($('#chat-messages-list')[0].scrollHeight);
            }    
        })

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            // console.log(msg);
            if(msg !=''){
                self.socket.emit('send-message', {
                    message: msg,
                    user_email: self.userEmail,
                    user_name: self.userName,
                    chatroom: 'codeial'
                })
            }
            $('#chat-message-input').val('');
            $('#chat-messages-list').scrollTop($('#chat-messages-list')[0].scrollHeight);
         });

        self.socket.on('receive-message', function(data){
            // console.log('message received', data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';
            
            if(data.user_email == self.userEmail ){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html' : data.message
            }));

            newMessage.append($('<small>', {
                'html' : data.user_name
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}