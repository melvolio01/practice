var User = require('../models/user');

function usersIndex(req, res) {
  User.find(function(err, users) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ users: users });
  });
}

function usersShow(req, res) {
  User.findById(req.params.id, function(err, user) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ user: user });
  });
}

module.exports = {
  index: usersIndex,
  show: usersShow
};