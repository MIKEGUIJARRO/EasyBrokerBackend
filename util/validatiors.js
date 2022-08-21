function stringValidator(data) {
    return typeof data === 'string' || data instanceof String;
}

module.exports = { stringValidator }