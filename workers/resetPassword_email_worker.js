const queue = require('../config/kue');

const resetPasswordMailer = require('../mailers/resetPassword_mailer');

queue.process('emails-resetPassword',function(job,done){
    console.log('reset password email worker is processing a job ',job.data);
    resetPasswordMailer.resetPassword(job.data);
    done();
})