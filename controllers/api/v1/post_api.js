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

        const post = await Post.findById(req.params.id);

        if(String(post.user) == req.user._id){
            post.deleteOne();

            await  Comment.deleteMany({post:req.params.id})

            return res.status(200).json({
                message:'Post and associated comments deleted successfully!'
            });
        }else{
            return res.status(401).json({
                message:'You cannot delete this post!'
            });
        }
        
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}

