var express = require('express');
var router = express.Router();
var dashboardController = require('../controllers/dashboard');

/* GET rankings page. */
router.get('/', dashboardController.fetchData);

/* GET rankings page with filtered data. */
router.get('/state', dashboardController.fetchDataByState);


module.exports = router;