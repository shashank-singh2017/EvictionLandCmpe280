var express = require('express');
var router = express.Router();
var chartController = require('../controllers/piechart');

/* GET rankings page. */
router.get('/state', chartController.fetchDemographicData);

router.get('/', chartController.fetchData);


module.exports = router;