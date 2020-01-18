const { Thread } = require('../models/thread');

module.exports = async function (req, res, next) {
    let thread = await Thread.findById(req.params.id);
    if (thread) {
        if (thread.user.toString() !== req.user._id.toString()) {
            res.status(403).send('Not yours');
        }
        else {
            req.obj = thread;
            next();
        }
    }
    else {
        res.status(404).send(`Thread ${req.body._id} not found`);
    }
}