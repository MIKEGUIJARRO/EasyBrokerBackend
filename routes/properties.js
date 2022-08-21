const express = require('express');
const { getProperties, getProperty } = require('../controllers/properties')

const router = new express.Router();

router.route('/').get(getProperties);

router.route('/:id').get(getProperty);

module.exports = router