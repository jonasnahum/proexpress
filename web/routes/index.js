var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', appName: req.appName });
});


router.get('/json', function(req, res, next) {
  res.json({ title: 'Express', appName: req.appName, color: 'morado' });
});

router.get('/queryparser', function(req, res, next) {    
  res.render('queryparser', { query: JSON.stringify(req.query) });
});

router.get('/bodyparser', function(req, res, next) {    
  res.render('bodyparser', { body: '' });
});
router.post('/bodyparser', function(req, res, next) {    
  res.render('bodyparser', { body: JSON.stringify(req.body) });
});



module.exports = router;
