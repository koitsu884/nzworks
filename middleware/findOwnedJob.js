const { User } = require('../models/user');
const { Job } = require('../models/job');

module.exports = async function(req, res, next) {
    let user = await User.findOne({_id:req.user._id, is_active:true, 'profile.user_type': 'Business' });
    if(user){
        req.user = user;
    }
    else {
        res.status(404).send('Request user not found');
    }

    let job = await Job.findOne({_id:req.params.id, user:user._id});
    if(job){
        next();
    }
    else {
        res.status(404).send(`Job ${req.body._id} not found`);
    }
}