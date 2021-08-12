var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { 
    title: 'Express' 
  });
});

/* GET learn more page. */
router.get('/learn-more', function(req, res, next) {
  res.render('pages/learn-more', {
    title: 'Learn more'
  });
});


module.exports = router;
