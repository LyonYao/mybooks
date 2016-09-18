var express = require('express');
var router = express.Router();
var db = require('../db');
var crypto = require('crypto');
/* GET users listing. */
router.get('/users', function(req, res, next) {
	var db = require('../db');
	db.execQuery({sql:'select * from menus where parent_id=?',args:[-1],handler:function(results){
		console.log(results);
	}});
	res.send('respond with a resource');
});
router.post('/login', function(req, res) {
	
	db.execQuery({sql:'select * from users where user_name=?',args:[req.param('username')],handler:function(results){
		if(results&&results.length>0){
			var existsUser=results[0];
			console.log(crypto.createHmac('md5','mybooks').update(req.param('password')).digest('hex'));
			if(existsUser.password==crypto.createHmac('md5','mybooks').update(req.param('password')).digest('hex')){
				var loginUser={id:existsUser.id,userName:existsUser.user_name,nickName:existsUser.nick_name,isLogin:true};
				req.session.loginUser=loginUser;
				res.redirect('/');
			}else{
				req.flash('errorMessage', '密码错误!');
				res.redirect('/login');
			}
		}else{
			req.flash('errorMessage', '用户名不存在!');
			res.redirect('/login');
		}
	}});
	
});
module.exports = router;
