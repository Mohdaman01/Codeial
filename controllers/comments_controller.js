const Comment = require('../models/comment');
const Post =  require('../models/post');

module.exports.create = async function(req,res){
    const post = await Post.findById(req.body.post);
    if(post){
        try{
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })

            post.comments.unshift(comment);
            post.save();

            if (req.xhr){
            
                comment = await comment.populate('user', 'name');
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

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
            await Post.findByIdAndUpdate(postID,{$pull:{comments:req.params.id}});

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

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