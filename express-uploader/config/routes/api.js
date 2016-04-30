var router = require('express').Router();
var multer = require('multer');
var s3 = require('multer-s3');
var uuid = require('uuid');
var authenticationController = require('../../controllers/authentication');
var usersController = require('../../controllers/users');
var secret = require('../../config/tokens').secret;
var s3Config = require('../../config/s3');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  var token = req.headers.authorization.replace('Bearer ', '');

  jwt.verify(token, secret, function(err, user) {
    if(!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}


var upload = multer({
  storage: s3({
    // the folder within the bucket
    dirname: s3Config.dirname,
    // set this to your bucket name
    bucket: s3Config.bucket,
    // your AWS keys
    secretAccessKey: s3Config.secretAccessKey,
    accessKeyId: s3Config.accessKeyId,
    // the region of your bucket
    region: s3Config.region,
    // IMPORTANT: set the mime type to that of the file
    contentType: function(req, file, next) {
      next(null, file.mimetype);
    },
    // IMPORTANT: set the file's filename here
    // ALWAYS CHANGE THE FILENAME TO SOMETHING RANDOM AND UNIQUE
    // I'm using uuid (https://github.com/defunctzombie/node-uuid)
    filename: function(req, file, next) {
      // Get the file extension from the original filename
      var ext = '.' + file.originalname.split('.').splice(-1)[0];
      // create a random unique string and add the file extension
      var filename = uuid.v1() + ext;
      next(null, filename);
    }
  })
});

router.post('/register', upload.single('avatar'), authenticationController.register);
router.post('/login', authenticationController.login);

router.route('/users')
  .get(usersController.index);

router.route('/users/:id')
  .get(usersController.show);

module.exports = router;