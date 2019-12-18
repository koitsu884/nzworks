const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const { errorLogger, requestLogger } = require('./middleware/logging');

const app = express();
require('express-async-errors');
app.use(helmet())
app.use(cors({
    // exposedHeaders: ['x-auth-token'],
    credentials: true ,
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS",
}));
require('./startup/logging')();
app.use(bodyParser.json());
app.use(cookieParser());


// app.use(requestLogger());

app.use(passport.initialize());
//### Passport strategies ###
require('./startup/passport')(passport);
require('./startup/routes')(app);

//For test
app.use('/static', express.static('public'));
app.use('/static/welcome', express.static('welcome'));
app.use('/static/error', express.static('error'));

app.use(errorLogger());

require('./startup/db')();

module.exports = app;