var router = require('express').Router();
var staticController = require('../../controllers/static');

router.get('/', staticController.index);

module.exports = router;