var express = require('express');
var router = express.Router();
var analyzeData = require('../controllers/analyzeData');

/* GET rankings page. */
router.get('/', analyzeData.analyzedata);
router.get('/county', analyzeData.countydata);

module.exports = router;
