const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create_post = async function (req, res) {
    try {
        if (req.body.content.length > 0) {
            await Post.create({
                content: req.body.content,
                user: req.user._id
            })
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
            await Comment.deleteMany({ post: req.params.id })
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