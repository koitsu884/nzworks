const auth = require('../routes/auth');
const user = require('../routes/user');
const job = require('../routes/job');
const savedJob = require('../routes/savedJob');
const area = require('../routes/area');
const feedback = require('../routes/feedback');
const emailtest = require('../routes/emailtest');

module.exports = function(app) {
    app.use('/api/area', area);
    app.use('/api/auth', auth);
    app.use('/api/job', job);
    app.use('/api/user', user);
    app.use('/api/savedjob', savedJob);
    app.use('/api/feedback', feedback);
    app.use('/api/test', emailtest);
}