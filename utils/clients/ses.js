const nodemailer = require('nodemailer');
let AWS = require('aws-sdk');
const config = require("config");

AWS.config.update({
  accessKeyId: config.get("sesAccessKey"),
  secretAccessKey: config.get("sesSecretKey"),
  region: 'us-east-1',
});

module.exports = nodemailer.createTransport({
  SES: new AWS.SES({
    apiVersion: '2010-12-01'
  })
})