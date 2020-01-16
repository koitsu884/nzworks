const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const sgTransport = require('nodemailer-sendgrid');
const config = require("config");

sgMail.setApiKey(config.get("sendgridKey"));
const options = {
  apiKey: config.get("sendgridKey")
}

module.exports = nodemailer.createTransport(sgTransport(options));
