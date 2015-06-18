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

router.get('/cookie', function(req, res, next) { 
  var valor = '';
  if (req.cookies.galleta !== undefined)
      valor = req.cookies.galleta;
    
  res.render('cookie', { valor: valor });
});
router.post('/cookie', function(req, res, next) {
  //res.cookie un método para guardar una cookie
  res.cookie('galleta', req.body.valor, { maxAge: 5000, httpOnly: true });
  res.render('cookie', { valor: req.body.valor });
});

router.get('/session', function(req, res, next) {
  var fullname = req.session.fullname || '';
  res.render('session', { fullname: fullname, csrfToken: req.csrfToken() });
});
router.post('/session', function(req, res, next) {    
  req.session.fullname = req.body.nombre + ' ' + req.body.apellido;
  res.send('data is being processed');
});

module.exports = router;
