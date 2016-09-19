var logger = require('../log').logger;
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
	res.render('categories', { title: 'Hello Hellow' ,pluginCss:[],
   		pluginScript:[],
   		path:'/content/categories',
   		layout: 'layout'});
});

module.exports = router;