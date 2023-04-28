const User = require('../models/users');
const Post =  require('../models/post');
const Comment = require('../models/comment');

module.exports = function(req,res){
    return res.render('user');
}

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signin');
}

module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }  
    return res.render('user_signup');
}

module.exports.create_user =  async function(req,res){
    console.log(req.body);
     if(req.body.passward != req.body.confirm_password){
        // console.log('passward do not match');
        req.flash('error','passwards do not match!')
        return res.redirect('back');

     }else{ 

        try{

            const user = await User.findOne({email:req.body.email});

            if(!user){
                await User.create(req.body); 
                req.flash('success','Account created successfully!');
                return res.redirect('/users/user-signin');

            }else{
                // console.log('error this email is all ready registerd!!!');
                req.flash('error','This email is all ready registerd!');
                return res.redirect('back');
            }
        }catch(error){
            console.log('error: ',error);
            req.flash('error',error);
            return res.redirect('back');
        }

     }    
}

module.exports.create_session = async function(req,res){
    req.flash('success','Logged in Successfully!');
    return res.redirect('/');
}

module.exports.profile = async function(req,res){
    const user = await User.findById(req.params.id);
    return res.render('profile',{
        title:"profile",
        profile_user:user
    })
}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        await User.findByIdAndUpdate(req.params.id,req.body);
        req.flash('success','Profile updated Successfully!')
        return res.redirect('back');
    }else{
        req.flash('error','You are Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

module.exports.destroy_user = async function(req,res){
    if(req.user.id == req.params.id){
        
        await Post.findOneAndDelete({user:req.params.id});
        await Comment.deleteMany({user: req.params.id})
        await User.findByIdAndDelete(req.params.id);
        
        req.logout(function(err) {
            if (err) {
              return next(err);
            }
            return res.redirect("/");
          });
        req.flash('success','Account deleted Successfully!');
        return res.redirect('/');
    }else{
        return res.status(401).send('Unauthorized');
    }
}
 
module.exports.destroySession = function(req,res,next){
    
    req.logout(function(err) {

        if (err) {
          return next(err);
        }
        
        req.flash('success','Logged out Succesfully!');
        return res.redirect("/");
      });
}