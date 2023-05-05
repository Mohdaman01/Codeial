const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

const dotenv = require('dotenv'); 
dotenv.config(); 

passport.use(new googleStrategy({
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret,
    callbackURL:"http://localhost:3000/users/auth/google/callback"
}, async function(accessToken,refreshToken,profile,done){
    console.log(profile);
    try{
        const user = await User.findOne({email: profile.emails[0].value});
        if(user){
            return done(null,user);
        }else{
            const user = await User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                passward: crypto.randomBytes(20).toString('hex'),
                avatar:profile._json.picture
            });
            return done(null,user); 
        }
    }catch(err){
        console.log('Error in google strategy-passport',err);
        return;
    }
}))

