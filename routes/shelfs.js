var logger = require('../log').logger;
var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
	res.render('shelfs', { title: 'Hello Hellow' ,pluginCss:[],
   		pluginScript:[],
   		path:'/content/shelf',
   		layout: 'layout'});
});

module.exports = router;