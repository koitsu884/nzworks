const express = require('express');
const passport = require('passport');

const { SavedJob, validate, JOBSTATUS_REMOVED } = require('../models/savedJob');
const { Job } = require('../models/job');

const router = express.Router();

function setHistoryInfo(savedJob, job){
    savedJob.jobTitle = job.title;
    savedJob.areaName = job.area ? job.area.name : 'その他';
    savedJob.jobCategory = job.jobCategory;
    savedJob.employerName = job.user.name;
    savedJob.employerImage = job.user.avatar;
}

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
        // let savedJobs = await SavedJob.find({ user:req.user._id })
        // .populate({path:'job',
        //     model: 'jobs',
        //     populate: [
        //         { path: 'user', model: 'users', select: 'name profile.avatar'},
        //         { path: 'area', model: 'areas', select: 'name'}
        //     ]});
    let savedJobs = await SavedJob.find({ user:req.user._id });
    res.send(savedJobs);
});

router.get('/:jobId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let savedJob = await SavedJob.findOne({ user:req.user._id, job:req.params.jobId })
    if(!savedJob){
        return res.status(404).send("Record not found");
    } 
    if(savedJob.jobStatus !== JOBSTATUS_REMOVED)
    {
        //Refresh data with latest info
        let job = await Job.findById(savedJob.job);
        setHistoryInfo(savedJob, job);
    }

    return res.send(savedJob); 
})

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let job = await Job.findById(req.body.job)
                    .populate('user', ['name', 'profile.avatar'])
                    .populate('area', ['name']);
    if(!job) return res.status(404).send("求人が見つかりません");
    if(!job.is_active) return res.status(404).send("その求人は募集を停止中です");

    let savedJob = new SavedJob(req.body);
    savedJob.user = req.user;
    setHistoryInfo(savedJob, job);
    // savedJob.title = job.title;
    // savedJob.areaName = job.area.name;
    // savedJob.jobCategory = job.jobCategory;
    // savedJob.employerName = job.user.name;
    // savedJob.employerImage = job.user.avatar;

    try {
        await savedJob.save();
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something wrong');
    }

    res.status(201).send(savedJob);
})

router.put('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        savedJob = await SavedJob.findOneAndUpdate({ user: req.body.user, job: req.body.job }, req.body, { new: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something wrong');
    }

    res.status(200).send(savedJob);
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await SavedJob.findByIdAndDelete(req.params.id);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Something wrong');
    }

    res.status(200).send('OK');
})

module.exports = router; 
