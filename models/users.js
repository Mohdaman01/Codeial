const mongoose = require('mongoose');

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
    }
});

module.exports = mongoose.model('user',userSchema);