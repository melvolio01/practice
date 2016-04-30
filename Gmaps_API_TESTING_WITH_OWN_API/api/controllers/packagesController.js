var Package = require("../models/package");

function packageIndex(req, res){
  Package.find({}, function(err, packages) {
    if (err) return res.status(404).send(err);
    res.status(200).send(packages);
  });
}

function packageCreate(req, res){
  Package.create(req.body.package, function(err, package){
    if (err) return res.status(404).send(err);
    return res.status(200).json({ package: package });
  });
}

module.exports = {
  index: packageIndex,
  create: packageCreate
}
