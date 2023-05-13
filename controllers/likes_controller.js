const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLikes = async function(req,res){
    try{
        let Likeable;
        let deleted = false;

        if(req.query.type == 'post'){

            Likeable = await Post.findById(req.query.id).populate('likes');

        }else{

            Likeable = await Comment.findById(req.query.id).populate('likes');

        }

        //check a Like already exists
        let existingLike = await Like.findOne({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        });

        // if a Like already exists delete it
        if(existingLike){
            Likeable.likes.pull(existingLike._id);
            Likeable.save();

            await Like.findByIdAndDelete(existingLike._id);
            deleted = true;
        }else{  
        // else make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            Likeable.likes.push(newLike._id);
            Likeable.save();
        };

        res.status(200).json({
            message: 'Request Successfull!',
            data: {
                deleted: deleted
            }
        })

    }catch(err){
        console.log('Error in toggling the likes: ',err);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}