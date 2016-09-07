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
router.post('/login', function(req, res) {
	var db = require('../db');
	db.execQuery({sql:'select * from menus where parent_id=?',args:[-1],handler:function(results){
		console.log(results);
	}});
	req.flash('errorMessage', 'Flash is back!');
	res.redirect('/login');
});
module.exports = router;
