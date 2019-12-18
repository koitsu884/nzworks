const winston = require('winston');
var expressWinston = require('express-winston');

module.exports.requestLogger = function () {
  return expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  })
};

module.exports.errorLogger = function () {
  return expressWinston.errorLogger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  });
} 