const mongoose =  require('mongoose');

const chatSchema = mongoose.Schema({
    message: {
        type: String
    },
    user_email: {
        type: String
    },
    user_name: {
        type: String
    },
    chatroom: {
        type: String
    }
},{
    timestamps: true
});

const chat = mongoose.model('Gloabl Chat',chatSchema);

module.exports = chat;