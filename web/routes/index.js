var express = require('express');
var router = express.Router();
var timeout = require('connect-timeout');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Programa de Express', appName: req.appName });
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
    
  res.render('cookie', { valor: valor });//lo que venga en cookie o "".
});
router.post('/cookie', function(req, res, next) {
  //res.cookie un método para guardar una cookie//cookie se guarda en res.
  res.cookie('galleta', req.body.valor, { maxAge: 5, httpOnly: true });//post.
  res.render('cookie', { valor: req.body.valor });//lo que venga en el post
});

router.get('/session', function(req, res, next) {
  var fullname = req.session.fullname || '';//lo que venga en session o nada.
  res.render('session', { fullname: fullname, csrfToken: req.csrfToken()});
});
router.post('/session', function(req, res, next) {    
  req.session.fullname = req.body.nombre + ' ' + req.body.apellido;//la session= form.
  res.send('data is being processed');
});
router.get('/slow-request', timeout('1s'),
    function(request, response, next) {
           setTimeout(function(){
               if (request.timedout) 
                   return false;
               return next();
           }, 999 + Math.round(Math.random()));
    }, function(request, response, next) {
    response.send('ok');
});

var errorMiddleware = function(req, res, next){
    next(new Error('something went wrong con esta pagina de jon{as'));
};

router.get('/error', errorMiddleware, function(req, res, next) {
    res.render('index');
});
 
router.delete('/delete', function(request, response){
    console.log('The DELETE route has been triggered');
    response.status(204).end();
});
router.get('/response-time', function(request, response){
    setTimeout(function(){
        response.status(200).end();
    }, 513);//call the function after 513 miliseconds.
});
router.get('/upload', function(request, response){
    response.render("upload");
});
router.post('/upload', function(request, response) {
    request.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        file.on('data', function(data){
            fs.writeFile(__dirname + '/../public/shared/'+ filename, data);
        });
        file.on('end', function(){
            console.log('File' + filename + 'is ended');
        });
    });
    request.busboy.on('finish', function(){
        console.log('Busboy is finished');
        response.status(201).end();
    })
});

module.exports = router;
