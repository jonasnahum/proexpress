var express = require('express');
var router = express.Router();
var timeout = require('connect-timeout');
var fs = require('fs');

/* GET home page. */
router.get('/:nombre/:apellido', function(req, res, next) {
  var userName = req.query.userName;
  var password = req.query.password;
    
  var nombre = req.params.nombre;
  var apellido = req.params.apellido;
    
  res.render("urlparams", {userName: userName, password: password,
                          nombre: nombre, apellido: apellido
                          });
});



module.exports = router;
