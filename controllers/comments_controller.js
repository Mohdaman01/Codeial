const Comment = require('../models/comment');
const Post =  require('../models/post');

module.exports.create = async function(req,res){
    const post = await Post.findById(req.body.post);
    if(post){
        try{
            const comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })

            post.comments.push(comment);
            post.save();
            req.flash('success','Commented Successfully!');
            res.redirect('/');
        }catch(error){
            console.log(error);
        }
    }
}

module.exports.destroy_comment = async function(req,res){
    const comment = await Comment.findById(req.params.id);
    const post = await Post.findById(String(comment.post));
     
    try{
        if((String(comment.user) ==  req.user.id) || String(post.user) == req.user.id){
            const postID = comment.post;
            await Comment.findByIdAndDelete(req.params.id);
            await Post.findByIdAndUpdate(postID,{$pull:{comments:req.params.id}})
            req.flash('success','Comment deleted Successfully!')
            return res.redirect('back');
            }else{
                req.flash('error','You are Unauthorized');
                return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        req.flash('error',err);
        return res.redirect('back');
    }
   
}