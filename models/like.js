const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    onModel:{
        type: String,
        required: true,
        enum: ['post','comment']
    }
},{
    timestamps: true
});

const Like = mongoose.model('like',likeSchema);

module.exports = Like;