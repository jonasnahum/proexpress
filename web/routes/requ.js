var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("request", {
        route: JSON.stringify(req.route)
    });
});
router.get('/cookies', function(req, res){
    if (!req.cookies.counter)
        res.cookie('counter', 0);//metodo hace set a cookie ..siempre en res. y al browser
    else
        res.cookie('counter', parseInt(req.cookies.counter,10) + 1);//se guarda cualquier obto en la cookie.
    res.send('resCookie', {
        cookie: JSON.stringify(req.cookies)
    });
});
router.get('/signedcookies', function(req, res){//oculta el sid de la cookie.
    if (!req.signedCookies.counter)
        res.cookie('counter', 0, {signed: true});
    else
        res.cookie('counter', parseInt(req.signedCookies.counter,10) + 1, {signed: true});
    res.render('resCookie', {
        cookie: JSON.stringify(req.signedCookies)
    });
});
router.get('/headers', function(req, res){//oculta el sid de la cookie.
    if (!req.signedCookies.counter)
        res.cookie('counter', 0, {signed: true});
    else
        res.cookie('counter', parseInt(req.signedCookies.counter,10) + 1, {signed: true});
    res.render('resCookie', {
        cookie: JSON.stringify(req.signedCookies)
    });
});
router.get('/headers', function(req, res){
  
  res.render('headers', { 
    header1: req.get('content-type') || '',
    header2: req.header('Content-Type') || '',
    header3: req.get('Content-type') || ''
  });
})


module.exports = router;
