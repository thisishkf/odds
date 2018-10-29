const request = require('request');
const logger = require(__dirname + '/../logger');

const asyncRequest = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            reqestLog(options);
            request(options, function (error, response, html) {
                ResponseLog(response);
                if (error) {
                    return reject(error);
                }
                return resolve({ response, html });
            });
        } catch (err) {
            throw err;
        }
    });
}

const reqestLog = function (options) {
    let { method, url, body } = options;
    switch (method.toUpperCase()) {
        case 'POST':
        case 'GET':
        default:
    }
    logger.info(`Sending Request:`);
    logger.info(`\turl:${url}`);
}

const ResponseLog = function (response) {
    logger.info(`Recieveing Response:`);
    logger.info(`\tStatus Code: ${response.statusCode}`);
    logger.info(`\tError: ${JSON.stringify(response.error)}`);
}

module.exports = {
    asyncRequest: asyncRequest
}