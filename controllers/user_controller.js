const User = require('../models/users');
const Post = require('../models/post');
const Comment = require('../models/comment');
const resetPasswordToken = require('../models/resetPasswordToken');
const fs = require('fs');
const path = require('path');
const queue = require('../config/kue');
const resetPasswordMailer = require('../mailers/resetPassword_mailer');
const resetPasswordWorker = require('../workers/resetPassword_email_worker');
const crypto = require('crypto');

module.exports = function (req, res) {
    return res.render('user');
}

module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_signin');
}   

module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_signup');
}

module.exports.create_user = async function (req, res) {
    console.log(req.body);
    if (req.body.passward != req.body.confirm_password) {
        // console.log('passward do not match');
        req.flash('error', 'passwards do not match!')
        return res.redirect('back');

    } else {

        try {

            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                await User.create(req.body);
                req.flash('success', 'Account created successfully!');
                return res.redirect('/users/user-signin');

            } else {
                // console.log('error this email is all ready registerd!!!');
                req.flash('error', 'This email is all ready registerd!');
                return res.redirect('back');
            }
        } catch (error) {
            console.log('error: ', error);
            req.flash('error', error);
            return res.redirect('back');
        }

    }
}

module.exports.create_session = async function (req, res) {
    req.flash('success', 'Logged in Successfully!');
    return res.redirect('/');
}

module.exports.profile = async function (req, res) {
    const user = await User.findById(req.params.id)
    .populate({
        path:'friends',
        populate: {
            path:'from_user to_user'
        }
    })
    .populate({
        path: 'friendRequests',
        populate: {
            path: 'from_user'
        }
    });

    return res.render('profile', {
        title: "profile",
        profile_user: user
    })
}

module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        // await User.findByIdAndUpdate(req.params.id,req.body);
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if (err) {console.log('*****Multer Error: ', err)}
                
                user.name = req.body.name;
                user.email = req.body.email;
 
                if (req.file){

                    if(user.avatarGoogle){
                        user.avatarGoogle = "";
                    }
 
                    if (user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }


                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success','profile updated Successfully!')
                return res.redirect('back');
            });
        } catch (err) {
            console.log('Error: ',err);
            return res.redirect('back');
        }


    } else {
        req.flash('error', 'You are Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

module.exports.destroyAvatar = async function(req,res){
    try{
        const user = await User.findById(req.params.id);

        if(user.avatarGoogle){

            user.avatarGoogle="";

            user.save();

            return res.redirect('back');
        }
         
        if(user.avatar){

            fs.unlinkSync(path.join(__dirname, '..', user.avatar));

            user.avatar = "";

            user.save();

            req.flash('success', 'profile picture deleted!');

            return res.redirect('back');

        }else{
            req.flash('error', 'You are Unauthorized');
            return res.status(401).send('Unauthorized');
        } 
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.destroy_user = async function (req, res) {
    if (req.user.id == req.params.id) {

        await Comment.deleteMany({ user: req.params.id })
        await Post.findOneAndDelete({ user: req.params.id });
        let user = await User.findById(req.params.id);
        if (user.avatar){
            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
        }
        await User.findByIdAndDelete(req.params.id);

        req.logout(function (err) {
            if (err) {
                return console.log('delete-user-error: ',err); 
            }
            return res.redirect("/");
        });
        req.flash('success', 'Account deleted Successfully!');
        return res.redirect('/');
    } else {
        return res.status(401).send('Unauthorized');
    }
}

module.exports.destroySession = function (req, res, next) {

    req.logout(function (err) {

        if (err) {
            return next(err);
        }

        req.flash('success', 'Logged out Succesfully!');
        return res.redirect("/");
    });
};

module.exports.forgotPasswordPage = function(req,res){
    res.render('resetPassword');
}

module.exports.resetPasswordEmail = async function(req,res){
    try{
        const user = await User.findOne({email: req.body.email});
        
        if(user){
            let resetUser = await resetPasswordToken.create({
                user:user._id,
                accessToken: crypto.randomBytes(20).toString('hex'),
                isValid:true
            });
           
            resetUser = await resetUser.populate('user','name email');

            let job =  queue.create('emails-resetPassword',resetUser).save(function(err){
                if(err){
                    console.log('Error in sending to the queue',err);
                    return;
                }
                console.log('job enqueued',job.id);
            });
            req.flash('success','Email sent to our registered email id Successfully!');
            return res.redirect('/');

        }else{
            console.log('email does not match!');
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in reseting the password: ',err);
        return res.redirect('back');
    }
};

module.exports.resetPasswordPage = async function(req,res){
    try{
        let resetUser = await resetPasswordToken.findOne({accessToken: req.query.accessToken});
        if(resetUser){
            if(resetUser.isValid){
                return res.render('passwordResetPage',{
                    resetUser:resetUser
                });
            }else{
                   resetUser.deleteOne();
                   return res.send('<h1>you can not use this link again</h1>');
            }
        }else{
            return res.send('<h1>you can not use this link anymore</h1>');
        }
    }catch(err){
        console.log('Error in reseting the password: ',err);
        return res.redirect('back');
    } 
};

module.exports.resetPassword = async function(req,res){
    try{
        if(req.body.password == req.body.re_password){
            let resetUser = await resetPasswordToken.findOne({accessToken: req.query.accessToken});
    
            if(resetUser){
                 
                if(resetUser.isValid){

                    let user = await User.findById(resetUser.user._id);

                    user.passward = req.body.password;
                    user.save();

                    resetUser.isValid = false;
                    resetUser.save();
                    req.flash('success','Password changed Successfully!'); 
                    return res.redirect('/users/user-signin');
                }
            } 
        }else{
            req.flash('error','password do not watch!');
            res.redirect('back');
        }
    }catch(err){
        console.log('Error in resetPassword: ',err);
        return res.redirect('back');
    }
}