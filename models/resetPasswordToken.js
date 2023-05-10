const mongoose = require('mongoose');

const resetPasswordSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    accessToken:{
        type: String
    },
    isValid : {
        type: Boolean
    }
},{
    timestamps: true
});

const resetPassword = mongoose.model('resetPassword',resetPasswordSchema);

module.exports = resetPassword;