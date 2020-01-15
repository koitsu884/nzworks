const session = require('express-session');
const redis = require('redis');
const config = require('config');

const RedisStore = require('connect-redis')(session);
const client = redis.createClient(config.get('redisURL'));

module.exports = app => {
    app.use(
        session({
            store: new RedisStore({client}),
            secret: config.get('sessionSecret'),
            saveUninitialized: false,
            resave: false
        })
    )
}