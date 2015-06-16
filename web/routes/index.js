var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', appName: req.appName });
});


router.get('/json', function(req, res, next) {
  res.json({ title: 'Express', appName: req.appName, color: 'morado' });
});


module.exports = router;
