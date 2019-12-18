// const express = require('express');
// const helmet = require('helmet');
// const cors = require('cors');
// const passport = require('passport');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser')
// const { jwt, goauth } = require('./startup/passport')
// const { errorLogger, requestLogger } = require('./middleware/logging');

// const app = express();
// app.use(helmet())
// app.use(cors({
//     // exposedHeaders: ['x-auth-token'],
//     credentials: true ,
//     origin: 'http://localhost:3000',
//     methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
// }));
// app.use(bodyParser.json());
// app.use(cookieParser());


// // app.use(requestLogger());

// app.use(passport.initialize());
// //### Passport strategies ###
// require('./startup/passport')(passport);

// require('./startup/routes')(app);

// //For test
// app.use('/static', express.static('public'));
// app.use('/static/welcome', express.static('welcome'));
// app.use('/static/error', express.static('error'));

// app.use(errorLogger());

// require('./startup/db')();

const app = require('./app');

const port = process.env.PORT || 5000;
const server = app.listen(port, () => 
{
    const message = `Listening on port ${port}...`;
    console.log(message);
});

module.exports = server;

