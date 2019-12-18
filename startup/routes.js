const auth = require('../routes/auth');
const user = require('../routes/user');
const job = require('../routes/job');
const area = require('../routes/area');
const emailtest = require('../routes/emailtest');

module.exports = function(app) {
    app.use('/api/area', area);
    app.use('/api/auth', auth);
    app.use('/api/job', job);
    app.use('/api/user', user);
    app.use('/api/test', emailtest);
    app.get('/error', (req, res) => {
        res.send('Something went wrong');
    });
}