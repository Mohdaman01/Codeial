const Post =  require('../models/post');
const Comment = require('../models/comment');

module.exports.create_post = async function(req,res){
    if(req.body.content.length > 0){
        await Post.create({
            content:req.body.content,
            user:req.user._id
        })  
    }   
    return res.redirect('back');
} 
module.exports.destroy_post = async function(req,res){
    const post  =  await Post.findById(req.params.id);
    // console.log(req.params.id);
      try{
            if(String(post.user) == req.user.id){
                await Post.findByIdAndDelete(req.params.id);
                await Comment.deleteMany({post: req.params.id})
                return res.redirect('back');
            }else{
                res.redirect('back');
         }
        }catch(err){
            console.log(err);
    }
}