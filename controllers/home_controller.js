const post = require('../models/post');

module.exports = async function(req,res){

   const posts = await post.find({}).populate('user').populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).exec();

        return res.render('home',{
            title:'Codeial | Home',
            posts:posts
        });
 
}