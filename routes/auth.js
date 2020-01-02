const express = require('express');
const passport = require('passport');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const { Token, TOKEN_TYPE_PASSWORD, TOKEN_TYPE_VERIFY } = require('../models/token');
const { RefreshToken } = require('../models/refreshToken');
const { setAuthTokenToCookie, setTokensToCookie, getRefreshTokenFromRequest } = require('../helper/cookieManager');

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

    await setTokensToCookie(res, user);
    res.redirect(config.get('clientUrl'));
  }
)


/*=======================================================
 Email & Password
========================================================*/
router.post('', async (req, res) => {
  if( !req.body.email || !req.body.password) return res.status(400).send('Emailとパスワードは必須項目です');
  let user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user) return res.status(400).send('メールアドレスかパスワードが間違っています');

  const validPassword = await user.verifyPassword(req.body.password);
  if (!validPassword) return res.status(400).send('メールアドレスかパスワードが間違っています');

  if (!user.verified) return res.status(401).send('Ｅメールがまだ認証されていません');

  user.password = undefined;

  await setTokensToCookie(res, user);
  
  res.send(user);
})

router.get('/verify', async (req, res) => {
  let token = req.query.token;
  if (!token) return res.status(400).send('No token provided');

  try {
    let tokenObj = await Token.findOne({ token: token, type: TOKEN_TYPE_VERIFY });
    if (!tokenObj)
      return res.status(404).send('Token object was not found');

    let user = await User.findById(tokenObj._userId);
    if (!user)
      return res.status(404).send('User was not found');

    user.verified = true;
    await user.save();
    await Token.deleteOne(tokenObj);
    await setTokensToCookie(res, user);
    res.send(user);
    // const accessToken = user.generateAuthToken();
    // res.cookie('jwt', accessToken, cookieOptions).send(user);
  }
  catch (error) {
    res.status(500).send('Email verification failed');
  }
})

router.post('/forgotpassword', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("そのメールアドレスは登録されていません");
  }

  await user.sendPasswordResetEmail();
  res.status(200).send(user);
})

router.post('/resetpassword', async (req, res) => {
  let token = req.query.token;
  if (!token) return res.status(400).send('No token provided');

  try {
    let tokenObj = await Token.findOne({ token: token, type: TOKEN_TYPE_PASSWORD });
    if (!tokenObj)
      return res.status(404).send('Token object was not found');

    let user = await User.findById(tokenObj._userId);
    if (!user)
      return res.status(404).send('User was not found');

    user.password = req.body.password;
    await user.save();
    await Token.deleteOne(tokenObj);
    res.send('OK');
  }
  catch (error) {
    res.status(500).send('Password reset failed');
  }
})

router.put('/password', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let password = req.body.password;
  if (!password) return res.status(400).send('No data provided');

  let user = req.user;

  try {
    user.password = req.body.password;
    await user.save();
    res.send('OK');
  }
  catch (error) {
    res.status(500).send('Password change failed');
  }
})

/*=======================================================
 Refresh token
========================================================*/
router.get('/token', async (req, res) => {
  let refreshToken = getRefreshTokenFromRequest(req);

  if (!refreshToken) {
    return res.status(403).send();
  }

  let refreshTokenObj = await RefreshToken.findOne({ token: refreshToken });
  if (!refreshTokenObj)
    return res.status(401).send();

  let decodedToken;
  try{
    decodedToken = jwt.verify(refreshTokenObj.token, config.get('refreshTokenSecret'));
  }
  catch(err) {
    console.log(err);
    return res.status(403).send();
  }

  let user = await User.findById(decodedToken._id);
  if (!user)
    return res.status(404).send();

  let newAccessToken = user.generateAuthToken();
  setAuthTokenToCookie(res, newAccessToken);
  return res.send(newAccessToken);
})

/*=======================================================
 Delete user
========================================================*/
router.delete('', (req, res) => {
  res.clearCookie('jwt');
  res.clearCookie('refresh');
  res.send();
})

module.exports = router;