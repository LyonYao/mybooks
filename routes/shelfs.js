var logger = require('../log').logger;
var express = require('express');
var db = require('../db');
var router = express.Router();
router.get('/', function(req, res, next) {
	res.render('shelfs', {
		title : 'Hello Hellow',
		pluginCss : [ '/ace/assets/css/jquery-ui-1.10.3.full.min.css' ],
		pluginScript : [ '/ace/assets/js/jquery.validate.min.js',
				'/ace/assets/js/additional-methods.min.js',
				'/ace/assets/js/jquery-ui-1.10.3.full.min.js',
				'/ace/assets/js/jquery.ui.touch-punch.min.js',
				'/javascripts/shilfs.js' ],
		path : '/content/shelf',
		layout : 'layout'
	});
});
router.post(
				'/validate-name',
				function(req, res, next) {
					var shilfName = req.body.shilfName;
					var userId = req.session.loginUser['id'];
					db.execQuery({
								sql : 'SELECT COUNT(0) as count FROM shelfs WHERE user_id=? AND shelf_name=?',
								args : [ userId, shilfName ],
								handler : function(result) {
									if (result.error) {
										res.send(false);
										return;
									}
									var results = result.results;
									var count = results[0].count;
									if (count > 0) {
										res.send(false);
									} else {
										res.send(true);
									}
								}
							});
				});
router.post('/new', function(req, res, next) {
	var shilfName = req.body.shilfName;
	var userId = req.session.loginUser['id'];
	db.execQuery({
		sql : 'insert into shelfs (user_id,shelf_name,add_time)values(?,?,?)',
		args : [ userId, shilfName, new Date() ],
		handler : function(result) {
			if (result.error) {
				res.json({
					success : false,
					message : result.error.message
				});
				return;
			}
			res.json({
				success : true
			});
		}
	});
});
module.exports = router;