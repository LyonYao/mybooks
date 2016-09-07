var logger = require('../log').logger;
var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
   	res.render('index', { title: 'Hello Hellow' ,pluginCss:[],
   		pluginScript:[],
   		path:'/summary',
   		layout: 'layout'});
});
router.get('/login', function(req, res, next) {
	 res.render('login', { title: '欢迎登陆小小书库' ,pluginCss:[],
   		pluginScript:[],
   		path:'/login',
   		layout: false});
});
module.exports = router;
