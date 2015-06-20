var express = require('express');
var router = express.Router();
var timeout = require('connect-timeout');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("layout");
});



module.exports = router;
