const admin = require('../routes/admin');
const auth = require('../routes/auth');
const user = require('../routes/user');
const job = require('../routes/job');
const savedJob = require('../routes/savedJob');
const area = require('../routes/area');
const feedback = require('../routes/feedback');
const feed = require('../routes/feed');
const thread = require('../routes/thread');
// const emailtest = require('../routes/emailtest');
const test = require('../routes/test');

module.exports = function(app) {
    app.use('/api/admin', admin);
    app.use('/api/area', area);
    app.use('/api/auth', auth);
    app.use('/api/job', job);
    app.use('/api/user', user);
    app.use('/api/savedjob', savedJob);
    app.use('/api/feedback', feedback);
    app.use('/api/feed', feed);
    app.use('/api/thread', thread);
    // app.use('/api/test', test);
}