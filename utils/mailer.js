const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid');
const Email = require('email-templates');
const path = require('path');
// const sgMail = require('@sendgrid/mail');
const config = require("config");
// sgMail.setApiKey(config.get("sendgridKey"));
// const options = {
//   apiKey: config.get("sendgridKey")
// }
let AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: config.get("sesAccessKey"),
  secretAccessKey: config.get("sesSecretKey"),
  region: 'us-east-1',
});

// const client = nodemailer.createTransport(sgTransport(options));
// const client = nodemailer.createTransport({
//   host: 'mail.privateemail.com',
//   port: 465,
//   auth: {
//     user: config.get('mailUser'),
//     pass: config.get('mailPass'),
//   }
// });
const client = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01'
  })
})

const email = new Email({
  // send: true,
  juice: true,
  juiceResources: {
    webResources: {
      relativeTo: path.resolve('emails'),
      images: true
    }
  },
  preview: true,
  transport: client,
  views: {
    options: {
      extension: 'ejs'
    },
    root: path.resolve('emails'),
  }
});

sendMail = (to, from, subject, template, localParams = {}, options = {}) => {
  let message = {
    subject: subject,
    from: from,
    to: to
  };

  if (options.replyTo) {
    message.replyTo = options.replyTo;
  }

  if (options.attachments) {
    message.attachments = options.attachments;
  }

  return email.send({
    template: template,
    message: message,
    locals: localParams
  })
}

module.exports.validateApplyEmail = (to, name, link, from, fromName, jobTitle, message, attachments = null) => {
  if (!to) return "送り先アドレスが未入力です";
  if (!name) return "送り先名が未入力です";
  if (!link) return "ページリンクが設定されていません";
  if (!from) return "送り主アドレスが未入力です";
  if (!fromName) return "送り主名が未入力です";
  if (!jobTitle) return "求人タイトルが未入力です";
  if (!message) return "メッセージ本文がありません";
  if (attachments && attachments.length > 2) {
    return "添付ファイルは2つまでです"
  }
  return null;
}

module.exports.sendApplyEmail = (to, name, link, from, fromName, jobTitle, message, attachments = null) => {
  return sendMail(to,
    'ニュージーワークス <contact@nzworks-jp.com>',
    '【ニュージーワークス】求人応募',
    'apply',
    {
      from: from,
      name: name,
      link: link,
      fromName: fromName,
      jobTitle: jobTitle,
      message: message,
    },
    {
      replyTo: from,
      attachments: attachments
    }
  );
}

module.exports.sendEmailVerification = (to, name, link) => {
  return sendMail(to,
    'ニュージーワークス <contact@nzworks-jp.com>',
    '【ニュージーワークス】アカウント登録確認',
    'verify',
    {
      name: name,
      link: link
    }
  );
}

module.exports.sendPasswordResetLink = (to, name, link) => {
  return sendMail(to,
    'ニュージーワークス <contact@nzworks-jp.com>',
    '【ニュージーワークス】パスワードリセット',
    'password',
    {
      name: name,
      link: link
    }
  );
}

module.exports.sendFeedback = (name, email, title, message) => {
  return sendMail('nzoshigoto@gmail.com',
    'ニュージーワークス <contact@nzworks-jp.com>',
    '【ニュージーワークス】フィードバック',
    'feedback',
    {
      name,
      email,
      title,
      message
    },
    {
      replyTo: email
    }
  );
}