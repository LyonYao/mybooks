var logger = require('../log').logger;
var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	logger.info('Welcome visit index...');
	var db = require('../db');
	db.execQuery({sql:'select * from menus where parent_id=?',args:[-1],handler:function(results){
		console.log(results);
	}});
	db.release({});
   	res.render('index', { title: 'Hello Hellow' ,pluginCss:[],pluginScript:[],layout: 'layout'});
});
router.get('/hellow',function(req,res,next){
	logger.info('Welcome visit hellow...layout12');
  	res.render('index', { title: 'Hello Hellow' ,layout: 'layout12'});
});

module.exports = router;
