const User = require('../models/users');

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
        console.log('passward do not match');
        return res.redirect('back');

     }else{ 

        try{

            const user = await User.findOne({email:req.body.email});

            if(!user){
                await User.create(req.body); 
                return res.redirect('/users/user-signin');

            }else{
                console.log('error this email is all ready registerd!!!')
                return res.redirect('back');
            }
        }catch(error){
            console.log('error: ',error);
        }

     }    
}

module.exports.create_session = async function(req,res){
     return res.redirect('/');
}

module.exports.profile = async function(req,res){
    return res.render('profile',{
        title:"profile"
    })
}

module.exports.destroySession = function(req,res,next){
    req.logout(function(err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
}