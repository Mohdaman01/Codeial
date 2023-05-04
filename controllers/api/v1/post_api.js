const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    const posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    return res.status(200).json({
        message:'List of posts',
        posts:posts
    });
};

module.exports.destroy = async function(req,res){
    try{
        await Post.findByIdAndDelete(req.params.id);
        await  Comment.deleteMany({post:req.params.id})

        return res.status(200).json({
            message:'Post and associated comments deleted successfully!'
        })
    }catch(err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

