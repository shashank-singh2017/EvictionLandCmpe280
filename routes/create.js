var express = require('express');
var router = express.Router();
var createCtrl = require('../controllers/create');

router.get('/', createCtrl.home);
router.get('/showEntry', createCtrl.showEntry);
router.get('/updateEntry', createCtrl.updateEntry);
router.post('/processUpdateEntry', createCtrl.processUpdateEntry);
router.post('/new', createCtrl.createNew);

module.exports = router;
