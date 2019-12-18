const express = require('express');
const passport = require('passport');
const router = express.Router();
const config = require('config');

const { User } = require('../models/user');
const { Token, TOKEN_TYPE_PASSWORD, TOKEN_TYPE_VERIFY} = require('../models/token');

const cookieAge = 60 * 60 * 24 * 1000; //1 Day
const cookieOptions = { maxAge: cookieAge, httpOnly: true, sameSite: false };

router.get('/', async (req, res) => {
  res.send("Test ok");
});

/*=======================================================
 Google Oauth
========================================================*/
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/static/error' }),
  async (req, res) => {
    let email = req.user._json.email;
    let displayName = req.user.displayName;

    let user = await User.findOne({ email: email });
    if (!user) {
      user = new User({
        email: email,
        name: displayName,
        verified: true,
        profile: { user_type: 'Personal' }
      });
      await user.save();
    }
    else if (!user.verified) {
      user.verified = true;
      await user.save();
    }

    const token = user.generateAuthToken();

    res.status(200)
      .cookie('jwt', token, cookieOptions)
      .redirect(config.get('clientUrl'))
  }
)


/*=======================================================
 Email & Password
========================================================*/
router.post('', async (req, res) => {
  let user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user) return res.status(400).send('メールアドレスかパスワードが間違っています');

  const validPassword = await user.verifyPassword(req.body.password);
  if (!validPassword) return res.status(400).send('メールアドレスかパスワードが間違っています');

  if (!user.verified) return res.status(401).send('Ｅメールがまだ認証されていません');

  const token = user.generateAuthToken();
  user.password = undefined;
  res.cookie('jwt', token, cookieOptions).send(user);
})

router.get('/verify', async (req, res) => {
  let token = req.query.token;
  if (!token) return res.status(400).send('No token provided');

  try{
    let tokenObj = await Token.findOne({ token: token, type:TOKEN_TYPE_VERIFY });
    if(!tokenObj) 
      return res.status(404).send('Token object was not found');

    let user = await User.findById(tokenObj._userId);
    if(!user)
      return res.status(404).send('User was not found'); 

    user.verified = true;
    await user.save();
    Token.deleteOne(tokenObj);
    const accessToken = user.generateAuthToken();
    res.cookie('jwt', accessToken, cookieOptions).send(user);
  }
  catch(error) {
    res.status(400).send('Email verification failed');
  }
})

router.delete('', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.clearCookie('jwt').send();
})

module.exports = router; 
