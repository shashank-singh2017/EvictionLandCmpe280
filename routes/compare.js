var express = require('express');
var router = express.Router();
var compareController = require('../controllers/compare');

/* GET rankings page. */
router.get('/', compareController.compareState);
router.get('/statistics', compareController.getData);

module.exports = router;