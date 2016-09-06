/**
 * http://usejsdoc.org/
 */
var logger = require('../log').logger;
var express = require('express');
var db = require('../db');
var router = express.Router();
router.get('/', function(req, res, next) {
	logger.info('Welcome visit menu...');
	db.execQuery({sql:'select * from menus',handler:function(results){
		var menus={};
		var menusArray=[];
		results.forEach(function(item){
			menus[item['id']]={
					id:item['id'],menuName:item['menu_name'],menuIcon:item['menu_icon'],parentId:item['parent_id'],
					menuHref:item['menu_href'],isLeaf:item['is_leaf'],path:item['path'],
					children:[]
			};
		});
		for(var k in menus){
			var it=menus[k];
			if(-1==it['parentId']){
				menusArray.push(it);
				continue;
			}else{
				menus[it['parentId']].children.push(it);
			}
		}
		res.locals.menus = menusArray;
		next();
	}});
});
module.exports = router;
