const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const {join} = require('path');

const pugTemplates = require('../email-templates');
const {ROOT_EMAIL, ROOT_EMAIL_PASSWORD, ROOT_EMAIL_SERVICE, FRONTEND_URL} = require('../config');

const transporter = nodemailer.createTransport({
    service: ROOT_EMAIL_SERVICE,
    auth: {
        user: ROOT_EMAIL,
        pass: ROOT_EMAIL_PASSWORD
    }
});

const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: join(process.cwd(), 'email-templates')
    }
});

class EmailService {
    async sendEmail(userEmail, action, context){
        const templateInfo = pugTemplates[action];
        const html = await emailTemplates.render(templateInfo.template, {...context, FRONTEND_URL});

        const mailOptions = {
            from: 'NODE.JS TEAM',
            to: userEmail,
            subject: templateInfo.subject,
            html
        };

        return transporter.sendMail(mailOptions);
    }

}

module.exports = new EmailService;
