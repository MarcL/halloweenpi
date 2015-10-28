var winston = require('winston');

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var logFilename =
	'logs/log-' +
	year + '-' +
	month + '-' +
	day + '.log';

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({timestamp: true, colorize: true}),
		new (winston.transports.File)({timestamp: true, filename: logFilename })
	]
});

module.exports = logger;
