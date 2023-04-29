const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/users');

module.exports.create_post = async function (req, res) {
    try {
        if (req.body.content.length > 0) {
            let post = await Post.create({
                content: req.body.content,
                user: req.user._id
            })

        if(req.xhr){

            post = await post.populate('user','name');

            return res.status(200).json({
                data:{
                    post:post
                },
                message: "Post created!"
            })
        }
    }

        req.flash('success', 'Post published!')
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        req.flash('error', error);
        return res.redirect('back');
    }

}
module.exports.destroy_post = async function (req, res) {

    try {
        const post = await Post.findById(req.params.id);

        if (String(post.user) == req.user.id) {
            await Post.findByIdAndDelete(req.params.id);
            await Comment.deleteMany({ post: req.params.id });

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },
                    message:'Post deleted!'
                })
            }
            req.flash('success','Post and associated comments deleted!');
            return res.redirect('back');
        } else {
            req.flash('error','You cannot delete this post!');
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
        req.flash('error',error)
        return res.redirect('back');
    }
}