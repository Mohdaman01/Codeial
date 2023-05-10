const nodemailer = require('../config/nodemailer');
const dotenv = require('dotenv');
dotenv.config();

module.exports.resetPassword = (resetUser) => {
    let htmlString = nodemailer.renderTemplate({resetUser: resetUser},'/users/reset_password.ejs'); 
    
    nodemailer.transporter.sendMail({
        form: process.env.user_email,
        to: resetUser.user.email,
        subject: 'reset password',
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending password reset mail: ',err);
            return;
        }
        console.log('Message sent',info);
        return;
    })
};