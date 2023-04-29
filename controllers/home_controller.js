const Post = require('../models/post');
const User = require('../models/users');


module.exports = async function(req,res){

   const posts = await Post.find({})
   .sort('-createdAt')
   .populate('user')
   .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).exec();

    const users = await User.find({});

    return res.render('home',{
        title:'Codeial | Home',
        posts:posts,
        all_Users:users
    });
 
}