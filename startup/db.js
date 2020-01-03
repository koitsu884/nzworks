const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');
// require('../helper/cache');

module.exports = function () {
    const dbConnection = config.get('db');
    console.log(dbConnection);
    mongoose.connect(dbConnection, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        // const message = `Connected to ${dbConnection}...`;
        // winston.info(message);
        // console.log(message);
    })
}