const express = require('express');
const passport = require('passport');
const router = express.Router();
const config = require('config');

const {sendEmailVerification} = require('../utils/mailer');

router.get('/email/verify', async (req, res) => {
    sendEmailVerification("test@test.com", "test", 'http://localhost:3000')
                      .then(response => {
                        console.log("Email sent");
                      })
                      .catch(errors => {
                        console.log(JSON.stringify(errors));
                      })
  res.send("Test ok");
});

module.exports = router; 
