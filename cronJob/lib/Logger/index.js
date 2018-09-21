/**
 * @author 		Sam Ho <hkf1113@gmail.com>
 * @create 		2018-04-19
 * @modified 	2018-08-02
 */

const fs = require('fs');

const { color, level, days } = require(__dirname + '/constant');

var state = null;

const init = function (config) {
	state = config;
};

const info = function (msg) {
	writeLog("info", color.default, `\t${msg}`);
};

const debug = function (msg) {
	writeLog("debug", color.default, `\t${msg}`);
};

const error = function (msg) {
	writeLog("error", color.red, msg);
};

const warn = function (msg) {
	writeLog("warn", color.yellow, `\t${msg}`);
};

const access = function (req) {
	let msg = makeAccessLog(req);
	writeLog("trace", color.default, msg);
};

/**
 *
 * @param {string} type
 * @param {string} color
 * @param {string} msg
 */
const writeLog = function (type, textColor, msg = "") {
	try {
		let { date, time } = getDayInfo();
		let text = `${date} ${time} [${process.pid}][${type}]\t ${msg}`;
		console.log(textColor, text, color.reset);
		if (level[state.level] > level[type] && state) {
			log2File(type, text);
		}
	} catch (err) {
		console.log(err);
		let { date, time } = getDayInfo();
		text = `${date} ${time} [thread id: ${process.pid}][${type}]\t ${JSON.stringify(err)}`;
		console.log(color.red, text, color.reset);
	}
};

/**
 * Write logging information to file
 *
 * @param {string} type 	Logging type (logger level)
 * @param {string} text 	Logging information
 */
const log2File = function (type = "debug", text = "") {
	//prepare file
	let { date } = getDayInfo();
	var fileName = state.filepath;
	switch (type) {
		case "error":
			fileName += state.filename.error;
			break;
		case "debug":
		default:
			fileName += state.filename.debug;
	}
	fileName = fileName.replace("{DATE}", date);
	//writing out message
	try {
		fs.stat(fileName, function (err, stat) {
			if (err === null) {
				fs.appendFileSync(fileName, text + "\n");
			} else if (err.code === 'ENOENT') {
				fs.writeFile(fileName, text, function () { });
			} else {
				console.log('[ERROR]: ', err.code);
			}
		});
	} catch (err) {
		process.stdout.write(err);
	}
};

/**
 * @private
 * @return {Object} All Information of today
 */
const getDayInfo = function () {
	let today = new Date();
	let year = `${today.getFullYear()}`;
	let month = today.getMonth() + 1;
	month = month >= 10 ? `${month}` : `0${month}`;
	let day = today.getDate() >= 10 ? `${today.getDate()}` : `0${today.getDate()}`;
	let week = days[today.getDay()];

	let hour = today.getHours() >= 10 ? `${today.getHours()}` : `0${today.getHours()}`;
	let min = today.getMinutes() >= 10 ? `${today.getMinutes()}` : `0${today.getMinutes()}`;
	let sec = today.getSeconds() >= 10 ? `${today.getSeconds()}` : `0${today.getSeconds()}`;
	let time = `${hour}:${min}:${sec}`;
	let date = `${year}${month}${day}`;

	return {
		year: year,
		month: month,
		day: day,
		week: week,
		time: time,
		date: date
	};
};

/**
 * make Access Log
 *
 * @param 	{Object} req 	Express Request Object
 * @return 	{string} Access Log Information
 */
const makeAccessLog = function (req) {
	var msg = `{ip} [{clfDate}] "{method} {url} {protocol}/{httpVersion}" "{contentLength}" "{referer}" "{userAgent}"`
	let data = {
		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null),
		clfDate: getDayInfo().date,
		method: req.method,
		protocol: req.protocol,
		url: req.url,
		httpVersion: req.httpVersion,
		contentLength: req.headers['content-length'] || "",
		referer: req.headers['referer'] || "",
		userAgent: req.headers['user-agent']
	}

	Object.keys(data).forEach((key) => {
		msg = msg.replace(`{${key}}`, data[key]);
	});
	return msg;
};

module.exports = {
	init: init,
	info: info,
	debug: debug,
	error: error,
	warn: warn,
	access: access
};
