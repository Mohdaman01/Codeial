const { renderSync } = require('node-sass');
const User = require('../../../models/users');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try{
        const user  =  await User.findOne({email: req.body.email});
        if(!user || user.passward != req.body.passward){
            return res.status(422).json({
                message:'Invalid username or password'
            });
        }

        return res.status(200).json({
                message:'Sign in successfull here is your token please keep it safe.',
                data:{
                    token: jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
                }
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Internal Server error!'
        });
    }
}