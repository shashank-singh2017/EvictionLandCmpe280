var express = require('express');
var router = express.Router();
var rankingsController = require('../controllers/rankings');

/* GET rankings page. */
router.get('/', rankingsController.rankings);

/* GET rankings page with filtered data. */
router.get('/state', rankingsController.countyRankingsByState);

module.exports = router;
