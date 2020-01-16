const nodemailer = require('nodemailer');
const config = require("config");

module.exports = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  auth: {
    user: config.get('mailUser'),
    pass: config.get('mailPass'),
  }
});