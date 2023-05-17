const Friend = require('../models/friend');
const FriendRequests = require('../models/friendRequests');
const User = require('../models/users');

module.exports.request = async function(req,res){
    try{
        let request = await FriendRequests.create({
            from_user: req.query.from_user,
            to_user: req.query.to_user
        });

        let user = await User.findById(req.query.to_user);
        user.friendRequests.push(request);
        user.save();

        return res.status(200).json({
            message: 'Friend request sent',
            request: request
        })
    }catch(err){
        console.log('error in friend request: ',err);
        return res.redirect('back');
    }
};

module.exports.accept_request = async function(req,res){
    try{
        let request = await FriendRequests.findById(req.query.request);
        if(request){
            let friend = await Friend.create({
                from_user: request.from_user,
                to_user: request.to_user
            });

            

            let user1 = await User.findById(request.to_user);
            let user2 = await User.findById(request.from_user);

            user1.friends.push(friend);
            user1.friendRequests.pull(request._id);
            user1.save();

            user2.friends.push(friend); 
            user2.save();

            await FriendRequests.findByIdAndDelete(request._id);

            friend = friend.populate('from_user to_user','name email');

            return res.status(200).json({
                message: 'Friend request accepted',
                friend: friend
            });

        }
    }catch(err){
        console.log('error in accepting request: ',err);
        return res.redirect('back');
    }
};

module.exports.reject_request = async function(req,res){
    try{
        let request = await FriendRequests.findById(req.query.request);
        let user = await User.findById(request.to_user);
        user.friendRequests.pull(request._id);
        user.save();
        request.deleteOne();

        return res.redirect('back');

    }catch(err){
        console.log('error in rejecting the request: ',err);
        return res.redirect('back');
    }
}