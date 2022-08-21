const { apiVersion } = require('../constants');

function stringValidator(data) {
    return typeof data === 'string' || data instanceof String;
}

function nextPageShadowing(urlStr) {
    return urlStr.replace(process.env.EASY_BROKER_URL, process.env.BACKEND_URL + apiVersion)
}

module.exports = { stringValidator, nextPageShadowing }