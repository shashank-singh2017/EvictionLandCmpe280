var express = require('express');
var router = express.Router();
var dashboardController = require('../controllers/dashboard');


/* GET user dashboard */
router.get('/state', dashboardController.fetchDataByState);

module.exports = router;