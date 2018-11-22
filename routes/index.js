var express = require('express');
var router = express.Router();

var mainController = require('../controllers/home');
var usersController = require('../controllers/users');

/* GET home page. */
router.get('/', usersController.login);

router.get('/home', mainController.home);

router.get('/index',mainController.index);

router.get('/ourteam', mainController.ourteam);

router.get('/shashank', mainController.shashank);

router.get('/arshdeep', mainController.arshdeep);

router.get('/divya', mainController.divya);

router.get('/pavana', mainController.pavana);

module.exports = router;
