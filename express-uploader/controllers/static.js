function staticIndex(req, res) {
  return res.render('index');
}

module.exports = {
  index: staticIndex
};