var express = require('express');
var router = express.Router();

var mapController = require('../controllers/maps');

router.get('/', mapController.map);

module.exports = router;
