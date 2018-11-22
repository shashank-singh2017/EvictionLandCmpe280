var express = require('express');
var router = express.Router();
var chartController = require('../controllers/linechart');

/* GET rankings page. */
router.get('/state', chartController.fetchEvictionRates);

router.get('/', chartController.fetchData);


module.exports = router;