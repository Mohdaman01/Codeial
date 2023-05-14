const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');


const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    passward:{
        type:String,
        required:true,
    },
    name:{ 
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    avatarGoogle:{
        type:String
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'friend'
        }
    ],
    friendRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'friendRequests'
        }
    ]
},{
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now());
    }
});

userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('user',userSchema);

module.exports = User;