const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial'
}

passport.use(new JWTStrategy(opts, async function(jwtPayload,done){
    try{
        const user = await User.findById(jwtPayload._id);

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    }catch(err){
        console.log('Error in finding user form JWT');
        return;
    }

}));

module.exports = passport;