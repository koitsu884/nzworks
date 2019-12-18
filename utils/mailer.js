const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid');
const Email = require('email-templates');
// const sgMail = require('@sendgrid/mail');
const config = require("config");
// sgMail.setApiKey(config.get("sendgridKey"));

const options = {
    apiKey: config.get("sendgridKey")
}

const client = nodemailer.createTransport(sgTransport(options));
const email = new Email({
  // send: true,
  preview: false,
  transport: client,
  views: {
    options: {
      extension: 'ejs'
    }
  }
});

sendMail = (to, from, subject, template, localParams = {}) => {
    return email.send({
      template: template,
      message: {
        subject: subject,
        from: from,
        to: to
      },
      locals: localParams
    })
}

module.exports.sendEmailVerification = (to, name, link) => {
  return sendMail(to, 
              'noreply@nzworks.com', 
              'NZワークス アカウント登録確認',
              'verify',
              {
                name: name,
                link: link
              }
              );
}

module.exports.sendPasswordResetLink = (to, name, link) => {
  return sendMail(to, 
    'noreply@nzworks.com', 
    'NZワークス パスワードリセット',
    'password',
    {
      name: name,
      link: link
    }
    );
}