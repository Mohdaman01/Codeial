const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type:string,
        required:true,
        unique:true
    },
    passward:{
        type:string,
        required:true,
    },
    name:{
        type:string,
        required:true
    }
});

module.exports = mongoose.model('user',userSchema);