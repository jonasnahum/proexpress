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
router.get('/headers', function(req, res){//los headers se mandan en el request con curl o postman.
    console.log(request.header('content-type'))
    //request.get('Content-Type');
    //request.get('content-type');
    
});


module.exports = router;
