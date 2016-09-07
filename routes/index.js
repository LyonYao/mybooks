var logger = require('../log').logger;
var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var error=req.flash('errorMessage');
	 console.log('ERRRR:::'+error);
   	res.render('index', { title: 'Hello Hellow' ,pluginCss:[],
   		pluginScript:[],
   		path:'/summary',
   		layout: 'layout'});
});
router.get('/login', function(req, res) {
	 var error=req.flash('errorMessage');
	 res.render('login', { title: '欢迎登陆小小书库' ,
   		errorMessage:error,
   		layout: false});
});

module.exports = router;
