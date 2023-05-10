const nodemailer = require('../config/nodemailer');
const dotenv = require('dotenv');
dotenv.config();

module.exports.newComment = (comment) => {

    let htmlString = nodemailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');

    nodemailer.transporter.sendMail({
        from: process.env.user_email,
        to: comment.user.email,
        subject: 'new content published!',
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail: ',err);
            return;
        }
        // console.log('Message sent', info);
        return;
    })
};
