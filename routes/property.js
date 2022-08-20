const express = require('express');
const { getProperties } = require('../controllers/property')

const router = new express.Router();

router.route('/').get(getProperties);

module.exports = router