CREATE TABLE `menus` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `parent_id` BIGINT(20) NOT NULL DEFAULT '-1',
  `menu_name` VARCHAR(50) NOT NULL COMMENT '菜单名称',
  `menu_icon` VARCHAR(255) DEFAULT NULL COMMENT '菜单图标',
  `menu_href` VARCHAR(255) DEFAULT NULL COMMENT '菜单路径',
  `is_leaf` INT(11) DEFAULT '0' COMMENT '是否是叶子节点',
  `path` VARCHAR(255) NOT NULL COMMENT '菜单路径',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC COMMENT='系统菜单';

CREATE TABLE `books` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `book_num` VARCHAR(36) DEFAULT NULL COMMENT '书籍编号',
  `user_id`  BIGINT(20) NOT NULL COMMENT '所属人id',
  `book_name` VARCHAR(60) DEFAULT NULL COMMENT '书籍名称',
  `auth` VARCHAR(20) DEFAULT NULL COMMENT '作者',
  `publisher` VARCHAR(100) DEFAULT NULL COMMENT '出版社',
  `add_time` DATETIME DEFAULT NULL COMMENT '添加时间',
  `description` TEXT COMMENT '描述',
  `shelf_id` BIGINT(20) DEFAULT NULL COMMENT '书架id',
  `category_id` BIGINT(20) DEFAULT NULL COMMENT '分类id',
  `shelf_name` VARCHAR(30) DEFAULT NULL COMMENT '书架名称',
  `category_name` VARCHAR(30) DEFAULT NULL COMMENT '分类名称',
  `star` INT(11) DEFAULT NULL COMMENT '喜欢星级',
  `face_img` VARCHAR(255) DEFAULT NULL COMMENT '书籍封面',
  PRIMARY KEY (`id`),
  UNIQUE KEY `book_num_unique` (`book_num`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC COMMENT='书籍';

CREATE TABLE `shelfs` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `shelf_name` VARCHAR(30) DEFAULT NULL COMMENT '书架名称',
  `user_id`  BIGINT(20) NOT NULL COMMENT '所属人id',
  `add_time` DATETIME DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC COMMENT='书架';

CREATE TABLE `categories` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(30) DEFAULT NULL COMMENT '分类名称',
  `user_id`  BIGINT(20) NOT NULL COMMENT '所属人id',
  `add_time` DATETIME DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC COMMENT='分类';

CREATE TABLE `users` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(30) DEFAULT NULL COMMENT '用户名称',
  `nick_name`  VARCHAR(30) NOT NULL COMMENT '昵称',
  `password`  VARCHAR(38) NOT NULL COMMENT '密码',
  `header_img` VARCHAR(255) DEFAULT NULL COMMENT '用户图像',
  `add_time` DATETIME DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC COMMENT='系统用户';

 ALTER TABLE `menus` ADD COLUMN `order_by` INT DEFAULT 0 COMMENT '顺序' AFTER `path`;