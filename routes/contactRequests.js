const express = require('express');
const { getContactRequests, postContactRequests } = require('../controllers/contactRequests');

const router = new express.Router()

router.route('/').get(getContactRequests);
router.route('/').post(postContactRequests);

module.exports = router;