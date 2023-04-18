const User = require('../models/users');

module.exports = function(req,res){
    return res.render('user');
}

module.exports.signin = function(req,res){
    res.render('user_signin');
}

module.exports.signup = function(req,res){
    res.render('user_signup');
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
    try{
         const user = await User.findOne({
            email:req.body.email
        });
         console.log(user);
         if(user){
            if(user.passward != req.body.passward){
                console.log('passward did not matched!!!')
                return res.redirect('back'); 

            }
            res.cookie('user_id',user.id);
            res.redirect('/users/profile')

         }else{
            console.log('email do not matched!!');
            return res.redirect('back'); 
         } 
    }catch(error){
        console.log(error);
    } 
}

module.exports.profile = async function(req,res){
    if(req.cookies.user_id){
        const user = await User.findById(req.cookies.user_id);
        if(user){
            console.log(user);
            res.render('profile',{
            title:'profile',
            user:user
        });
        } 
    }else{ 
        res.redirect('back');
    }

}

module.exports.delete_session = function(req,res){
    return res.clearCookie(req.cookies.user_id);
}