class chatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        this.socket.on('connet', function(){
            console.log('connection established using sockets...! ',this.socket.id); 
        })
    }
}