var express = require('express');
var router = express.Router();
var compareController = require('../controllers/compare');

/* GET rankings page. */
router.get('/', compareController.compareState);

module.exports = router;