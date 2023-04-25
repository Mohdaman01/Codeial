const mongoose= require('mongoose');

const postShema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ]
},{
    timestamps: true
});

module.exports = mongoose.model('post',postShema);