var logger = require('../log').logger;
var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	logger.info('Welcome visit index...');
   	res.render('index', { title: 'Hello Hellow' ,layout: 'layout'});
});
router.get('/hellow',function(req,res,next){
	logger.info('Welcome visit hellow...layout12');
  	res.render('index', { title: 'Hello Hellow' ,layout: 'layout12'});
});

module.exports = router;
