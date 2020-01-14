const express = require('express');
const passport = require('passport');
const router = express.Router();

const findAdminUser = require('../middleware/findAdminUser');
const withPagination = require('../middleware/withPagination');

const { User } = require('../models/user');


router.post('/resendVerifyEmail', passport.authenticate('jwt', { session: false }), findAdminUser, async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(404).send('not found');

    console.log('Resend email to ' + user.email);
  
    await user.sendVerifyEmail();
    res.status(201).send(user);
  })

router.get('/users', passport.authenticate('jwt', { session: false }), findAdminUser, withPagination, async (req, res) => {
  let options = {};
  let filters = {};

  if (req.page && req.size) {
    options.skip = req.size * (req.page - 1);
    options.limit = req.size;
  }

  if (req.query.unverified){
    filters.verified = false;
  }

  let query = User.find(filters, null, options);

  let itemCount = await User.countDocuments(filters);
  let users = await query.sort({created_at : -1});

  let returnData = {
    page: req.page,
    count: itemCount,
    users: users
  }

  res.send(returnData);
})

module.exports = router;