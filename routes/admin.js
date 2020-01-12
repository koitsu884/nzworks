const express = require('express');
const passport = require('passport');
const router = express.Router();

const findAdminUser = require('../middleware/findAdminUser');

const { User } = require('../models/user');


router.post('/resendVerifyEmail', passport.authenticate('jwt', { session: false }), findAdminUser, async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(404).send('not found');

    console.log('Resend email to ' + user.email);
  
    await user.sendVerifyEmail();
    res.status(201).send(user);
  })

module.exports = router;