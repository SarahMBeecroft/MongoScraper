module.exports = function(router) {
  router.get('/', function(req, res) {
    res.render('home');
  });
  // Rendes saved handlebars page
  router.get('/saved', function(req, res) {
    res.render('saved');
  });
}