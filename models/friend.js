const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
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

const friend = mongoose.model('friend',friendSchema);

module.exports = friend;