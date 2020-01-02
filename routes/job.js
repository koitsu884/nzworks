const express = require('express');
const passport = require('passport');
const config = require('config');

const findBusinessUser = require('../middleware/findBusinessUser');
const findOwnedJob = require('../middleware/findOwnedJob');

const { sendApplyEmail } = require('../utils/mailer');
const { Job, validate, validateUpdate } = require('../models/job');
const { SavedJob, JOBSTATUS_REMOVED } = require('../models/savedJob');
const { memoryUploadMulti } = require('../utils/formDataHandler');

const router = express.Router();

router.get('/', async (req, res) => {
    let query = Job.find({ is_active: true })
        .populate('area')
        .populate('user', ['_id', 'name', 'profile.avatar']);

    if (req.query.limit) {
        query = query.limit(+req.query.limit);
    }
    let jobs = await query.sort({ _id: -1 });

    res.send(jobs);
});

router.get('/:id', async (req, res) => {
    let job = await Job.findById(req.params.id)
        .populate('area')
        .populate('user', ['_id', 'name', 'profile.introduction', 'profile.avatar', 'profile.images']);

    if (!job) return res.status(404).send('この求人は存在しないか、既に削除されています');
    res.send(job);
})

router.post('/', passport.authenticate('jwt', { session: false }), findBusinessUser, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let job = new Job(req.body);
    job.user = req.user;
    try {
        await job.save();
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something wrong');
    }

    res.status(201).send(job);
})

router.put('/:id', passport.authenticate('jwt', { session: false }), findOwnedJob, async (req, res) => {
    const { error } = validateUpdate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let job;

    try {
        job = await Job.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something wrong');
    }

    res.status(200).send(job);
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), findOwnedJob, async (req, res) => {
    try {
        await Job.deleteOne({ _id: req.params.id });
        await SavedJob.updateMany({ job: req.params.id }, { $set: { jobStatus: JOBSTATUS_REMOVED } });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something wrong');
    }

    res.status(200).send('OK');
})

router.post('/search', async (req, res) => {
    const page = +req.query.page;
    const size = +req.query.size;
    let filters = Object.assign({}, req.body);
    filters.is_active = true;
    if (filters.jobCategory && filters.jobCategory.length > 0) {
        filters.jobCategory = { $in: filters.jobCategory };
    }
    else {
        delete filters.jobCategory;
    }

    if (filters.tags && filters.tags.length > 0) {
        filters.tags = { $all: filters.tags };
    }
    else {
        delete filters.tags;
    }

    let query = Job.find(filters)
        .populate('area')
        .populate('user', ['_id', 'name', 'profile.avatar']);

    if (page && size) {
        query.skip(size * (page - 1)).limit(size);
    }

    const itemCount = await Job.countDocuments(filters);
    let jobs = await query.sort({ _id: -1 });

    let returnData = {
        page: page,
        count: itemCount,
        jobs: jobs
    }

    res.send(returnData);
});

router.post('/:id/mail', passport.authenticate('jwt', { session: false }), memoryUploadMulti('attachment', 2), async (req, res) => {
    let job = await Job.findById(req.params.id).populate('user', ['name']);
    if (!job) {
        return res.status(404).send("その求人情報は既に削除されているか、存在しません。");
    }
    if (!job.is_active) {
        return res.status(400).send("その求人情報は現在募集停止中です");
    }
    if (!job.email) {
        return res.status(400).send("求人情報に連絡先メールアドレスが登録されていません");
    }

    var link = config.get('clientUrl') + "jobs/" + job._id;
    var attachments = [];
    if (req.files) {
        req.files.forEach(file => {
            attachments.push({
                filename: file.originalname,
                content: file.buffer
            })
        })
    }

    sendApplyEmail(
        job.email,
        job.user.name,
        link,
        req.body.email,
        req.body.name,
        job.title,
        req.body.message,
        attachments.length > 0 ? attachments : null
    ).then(result => {
        return res.status(200).send('OK');
    })
    .catch(error => {
        console.log(error);
        return res.status(500).send("Something wrong");
    });

})

module.exports = router; 
