var express = require('express');
var router = express.Router();
var stateAnalysisController = require('../controllers/stateAnalysis');

/* GET rankings page. */
router.get('/', stateAnalysisController.fetchData);
router.get('/showEvictionByState', stateAnalysisController.getDataByState)

module.exports = router;