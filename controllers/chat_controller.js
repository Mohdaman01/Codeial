const Chat = require('../models/chat');

module.exports.global_chat = async function(req,res){

    let globalChat = await Chat.find({});
    // console.log(globalChat);
    res.status(200).json({
        message: 'global chat recived',
        data: globalChat
    })
}