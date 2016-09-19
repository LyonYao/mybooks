/**
 * http://usejsdoc.org/
 */
var logger = require('../log').logger;
var express = require('express');
var db = require('../db');
var router = express.Router();
var menusArray = [];
db.execQuery({
	sql : 'select * from menus order by order_by asc',
	handler : function(results) {
		var menus = {};
		results.forEach(function(item) {
			menus[item['id']] = {
				id : item['id'],
				menuName : item['menu_name'],
				menuIcon : item['menu_icon'],
				parentId : item['parent_id'],
				menuHref : item['menu_href'],
				isLeaf : item['is_leaf'],
				path : item['path'],
				children : []
			};
			if (-1 == item['parent_id']) {
				menusArray.push(menus[item['id']]);
			}
		});
		for ( var k in menus) {
			var it = menus[k];
			if (-1 == it['parentId']) {
				continue;
			} else {
				menus[it['parentId']].children.push(it);
			}
		}

	}
});
router.get('/*', function(req, res, next) {
	logger.info('Welcome visit menu...');
	res.locals.menus = menusArray;
	next();
});
module.exports = router;
