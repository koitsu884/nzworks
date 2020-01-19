const express = require('express');
const passport = require('passport');
const config = require('config');

const findOwnedThread = require('../middleware/findOwnedThread');
const { memoryUploadSingle, bufferToDataUri } = require('../utils/formDataHandler');
const { singleUpload } = require('../utils/imageFileManager');
const { postImageFromUrl, postTweet } = require('../utils/twitter');

const { Thread, validate, validateUpdate, validateComment } = require('../models/thread');

const formDataHandler = memoryUploadSingle('photo');
const router = express.Router();

router.get('/', async (req, res) => {
    let threads = await Thread.find()
        .populate('user', ['_id', 'name', 'profile.avatar'])
        .sort({ created_at: -1 });

    res.send(threads);
});

router.get('/:id', async (req, res) => {
    let thread = await Thread.findById(req.params.id)
        .populate('user', ['_id', 'name', 'profile.avatar'])
        .populate('comments.user', ['_id', 'name', 'profile.avatar', 'profile.images']);

    if (!thread) {
        return res.status(404).send("Thread not found");
    }
    res.send(thread);
})

router.post('/', passport.authenticate('jwt', { session: false }), formDataHandler, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let thread = await Thread.findOne({ user: req.user._id });
    if (thread) {
        return res.status(400).send("スレッドは1つのアカウントにつき1つだけ投稿できます");
    }

    thread = new Thread(req.body);
    thread.user = req.user._id;

    if (req.file) {
        const file = bufferToDataUri(req).content;
        try {
            let result = await singleUpload(file, "image", `/thread/${req.user._id}`, "mainImage");
            let imageObj = {
                image_id: result.public_id,
                image_url: result.secure_url
            };
            thread.mainImage = imageObj;
        }
        catch (error) {
            console.log(error);
            return res.status(500).send("画像アップロードに失敗しました");
        }
    }

    try {
        await thread.save();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong");
    }

    res.send(thread);
})

router.post('/:id/tweet',  passport.authenticate('jwt', { session: false }), findOwnedThread, async (req, res) => {
    let thread = req.obj;
    let content = thread.details;
    let link = config.get('clientUrl') + "thread/" + thread._id;
    let status = `【新規情報投稿】\n『${thread.title}』`;
    let contentLength = 100 - status.length;
    
    if (content.length > contentLength) content = content.substring(0, contentLength) + '...';
    // let status = `【新規情報投稿】\n『${thread.title}』\n\n${content}\n\n${link}`;
    status += `\n\n${content}\n\n${link}`;

    if (thread.mainImage) {
        let mediaId = await postImageFromUrl(thread.mainImage.image_url);
        postTweet(status, mediaId);
    }
    else {
        postTweet(status);
    }
})

router.patch('/:id', passport.authenticate('jwt', { session: false }), findOwnedThread, async (req, res) => {
    const { error } = validateUpdate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let thread;
    try {
        thread = await Thread.findOneAndUpdate({ _id: req.params.id }, { "$set": req.body }, { new: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something wrong');
    }

    res.status(200).send(thread);
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await Thread.findByIdAndDelete(req.params.id);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }

    res.status(200).send('OK');
}),

    /*----------------------------------------------------------
    Thread comment
    -----------------------------------------------------------*/
    //Middle ware
    findThread = async (req, res, next) => {
        let thread = await Thread.findById(req.params.id);
        if (!thread) {
            return res.status(404).send("Thread not found");
        }
        req.thread = thread;
        next();
    }

router.get('/:id/comment', async (req, res) => {
    let thread = await Thread.findById(req.params.id)
        .populate('user', ['_id', 'name', 'profile.avatar'])
        .populate('comments.user', ['_id', 'name', 'profile.avatar']);
    if (!thread) {
        return res.status(404).send("Thread not found");
    }
    res.send(thread.comments);
})

router.post('/:id/comment', passport.authenticate('jwt', { session: false }), findThread, async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let thread = req.thread;
    let newComment = {
        user: req.user._id, comment: req.body.comment
    }
    thread.comments.push(newComment);
    await thread.save();

    res.status(201).send(thread.comments)
})


router.put('/:id/comment/:comment_id', passport.authenticate('jwt', { session: false }), findThread, async (req, res) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let thread = req.thread;

    const updateIndex = thread.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

    if (updateIndex < 0) {
        return res.status(404).send("Comment not found");
    }

    if (thread.comments[updateIndex].user.toString() !== req.user._id.toString()) {
        return res.status(403).send("Not yours");
    }

    thread.comments[updateIndex].comment = req.body.comment;
    await thread.save();

    res.send(thread.comments)
})

router.delete('/:id/comment/:comment_id', passport.authenticate('jwt', { session: false }), findThread, async (req, res) => {
    let thread = req.thread;

    const removeIndex = thread.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

    if (removeIndex < 0) {
        return res.status(404).send("Comment not found");
    }

    thread.comments.splice(removeIndex, 1);
    await thread.save();
    res.send();
})

module.exports = router; 
