var express = require('express'),
router  = express.Router();

var packagesController = require('../controllers/packagesController');

router.route('/packages')
  .get(packagesController.index)
  .post(packagesController.create)

module.exports = router;
