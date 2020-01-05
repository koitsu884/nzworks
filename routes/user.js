const express = require('express');
const passport = require('passport');
const _ = require('lodash');

const findUser = require('../middleware/findUser');
const findBusinessUser = require('../middleware/findBusinessUser');

const { User, validate } = require('../models/user');
const { Job } = require('../models/job');
const { validate: validateProfile } = require('../models/profile');
const { memoryUploadSingle, bufferToDataUri } = require('../utils/formDataHandler');
const { singleUpload, deleteFile, deleteFolder } = require('../utils/imageFileManager');
const { setRefreshTokenToCookie } = require('../helper/cookieManager');

const formDataHandler = memoryUploadSingle('photo');
const router = express.Router();

router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let refreshToken = await req.user.generateRefreshToken();
  setRefreshTokenToCookie(res, refreshToken);
  res.send(req.user);
});

router.get('/images', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.send({
    avatar: req.user.profile.avatar,
    images: req.user.profile.images
  });
});

router.get('/jobs', passport.authenticate('jwt', { session: false }), findUser, async (req, res) => {
  let params = {};

  switch (req.query.type) {
    case 'applied':
      params._id = { $in: req.user.profile.appliedJobs };
      break;
    case 'saved':
      params._id = { $in: req.user.profile.savedJobs };
      break;
    default:
      params.user = req.user._id;
  }

  if (req.query.active === 'true') {
    params.is_active = true
  }

  let jobList = await Job.find(params)
    .populate('area')
    .populate('user', ['_id', 'name', 'profile.avatar']);
  return res.send(jobList);
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user && user.verified) return res.status(400).send("そのＥメールアドレスは既に使用されています");

  if (!user) {
    user = new User(_.pick(req.body, ['email', 'password', 'name', 'profile']));
    try {
      await user.save();
    }
    catch (error) {
      console.log(error)
      return res.status(400).send("アカウントが作成に失敗しました");
    }
  }

  await user.sendVerifyEmail();
  res.status(201).send(user);
})

router.patch('/profile', passport.authenticate('jwt', { session: false }), findUser, async (req, res) => {
  console.log(req.body);
  const { error } = validateProfile(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    var update = Object.assign(req.user.profile, req.body);
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { "$set": { profile: update } }, { new: true });
    res.send(updatedUser.profile);
  }
  catch (error) {
    res.status(400).send("更新できませんでした");
    console.log(error);
  }
})

router.patch('/jobs/:id', passport.authenticate('jwt', { session: false }), findUser, async (req, res) => {
  let type = req.query.type;
  let remove = req.query.remove;
  let jobId = req.params.id;
  let user = req.user;
  let job = await Job.findById(jobId);
  if (!job) res.send(404).send(`Job record ${jobId} was not found`);

  switch (type) {
    case 'apply':
      if (remove === 'true') {
        user.profile.appliedJobs = user.profile.appliedJobs.filter(appliedJobId => appliedJobId.toString() !== jobId);
      }
      else {
        if (!user.profile.appliedJobs.includes(job._id))
          user.profile.appliedJobs.push(jobId)
        else {
          res.status(400).send("その求人は既に応募しています");
        }
      }
      break;
    case 'save':
      if (remove === 'true') {
        user.profile.savedJobs = user.profile.savedJobs.filter(savedJobId => savedJobId.toString() !== jobId);
      }
      else {
        if (!user.profile.savedJobs.includes(job._id)) {
          user.profile.savedJobs.push(jobId)
        }
        else {
          res.status(400).send("その求人は既に保存されています");
        }
      }
      break;
    default:
      res.status(400).send("Invalid parameter");
  }

  try {
    await user.save();
    res.send();
  }
  catch (error) {
    res.status(500).send("Something went wrong");
    console.log(error);
  }
})



router.post('/images', passport.authenticate('jwt', { session: false }), findUser, formDataHandler, async (req, res) => {
  const file = bufferToDataUri(req).content;
  let user = req.user;

  // console.log(file);

  console.log(`Uploading user photo for user ${user._id} (${req.file.size} byte)`)

  console.log(req.file.originalname);
  singleUpload(file, "image", `/user/${user._id}`, req.file.originalname)
    .then(async result => {
      let imageObj = {
        image_id: result.public_id,
        image_url: result.secure_url
      };
      user.profile.images.push(imageObj)
      // user.profile.avatar = {
      //   image_id: result.public_id,
      //   image_url: result.secure_url
      // }
      if(!user.profile.avatar){
        user.profile.avatar = imageObj;
      }
      await user.save();
      res.send(user.profile.images);
    })
    .catch(error => {
      res.status(400).send("アップロードに失敗しました");
      console.log(error.getMessage());
    })
})

router.delete('/', passport.authenticate('jwt', { session: false }), findUser, async (req, res) => {
  let user = req.user;
  //Delete images from cloudinary
  deleteFolder(`/user/${user._id}`)
    .then(console.log("Deleted user's images"))
    .catch(errors => console.log(errors));

  user.remove()
    .then(result => {
      res.status(200).send('OK');
    })
    .catch(error => {
      console.log(error);
      res.status(500).send("Something went wrong");
    });
})


router.delete('/images/:id', passport.authenticate('jwt', { session: false }), findUser, async (req, res) => {
  let user = req.user;
  let imageId = decodeURI(req.params.id);

  deleteFile(imageId)
    .then(async result => {
      // user.profile.avatar = null;
      if (user.profile.avatar && user.profile.avatar.image_id === imageId) {
        user.profile.avatar = null;
      }
      user.profile.images = user.profile.images.filter(image => image.image_id !== imageId)
      await user.save();
      res.send(user.profile.images);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Failed to delete the photo");
    })
})


module.exports = router; 
