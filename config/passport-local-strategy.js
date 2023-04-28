const passport = require('passport');

const bodyParser = require('body-parser');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

passport.use(bodyParser.urlencoded({ extended: false }));

passport.use(new LocalStrategy({
    usernameField:'email',
    passwordField:'passward',
    passReqToCallback:true
},
async function(req,email,passward,done){
    try{
            const user = await User.findOne({email:email});
            if(!user || user.passward != passward){
                req.flash('error','Invalid Username/Password');
                console.log('error in finding user ---> Passport');
                return done(null,false);
            }
            return done(null,user);
            
    }catch(error){
        console.log(error);
        req.flash('error',error);
        return done(error);
    }
    
}

));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(async function(id,done){
    try{
        const user = await User.findById(id);
        if(user){
            return done(null,user);
        }    
    }catch(error){
        console.log(error);
        return done(error);
    }
    
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/user-signin');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;

