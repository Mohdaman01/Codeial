const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps: true
});

const friendRequests = mongoose.model('friendRequests', requestSchema);
module.exports = friendRequests;