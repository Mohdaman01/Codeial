module.exports = function(req,res){
    return res.render('user');
}

module.exports.signin = function(req,res){
    res.render('user_signin');
}

module.exports.signup = function(req,res){
    res.render('user_signup');
}