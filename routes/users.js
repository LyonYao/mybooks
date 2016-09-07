var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
	var db = require('../db');
	db.execQuery({sql:'select * from menus where parent_id=?',args:[-1],handler:function(results){
		console.log(results);
	}});
	res.send('respond with a resource');
});
router.post('/login', function(req, res, next) {
	var db = require('../db');
	db.execQuery({sql:'select * from menus where parent_id=?',args:[-1],handler:function(results){
		console.log(results);
	}});
	console.log('LOGIN');
	res.send('respond with a resource');
});
module.exports = router;
