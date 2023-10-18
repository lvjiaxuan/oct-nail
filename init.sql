-- Active: 1696734414751@@127.0.0.1@3306
DROP DATABASE IF EXISTS oct_nail;
CREATE DATABASE IF NOT EXISTS `oct_nail` DEFAULT CHARACTER SET utf8mb4;

DROP TABLE IF EXISTS oct_nail.user;
CREATE TABLE IF NOT EXISTS oct_nail.user (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `fk_vip_card_id` INT UNSIGNED COMMENT '会员卡 ID',
  -- 用户信息
  `username` VARCHAR(32) COMMENT '用户名',
  `remark` VARCHAR(255) COMMENT '备注',
  -- 微信信息
  `nickname` VARCHAR(32) COMMENT '微信昵称',
  `phone` CHAR(11) COMMENT '手机号',
  `gender` CHAR(1) DEFAULT 'f' COMMENT '性别：f-女性、m-男性',
  `age` TINYINT UNSIGNED COMMENT '年龄',
  `avatar_url` VARCHAR(600) COMMENT '头像地址',
  `openid` CHAR(11) COMMENT '微信 openid',
  -- 通用
  `created_by` VARCHAR(32) COMMENT '创建人',
  `updated_by` VARCHAR(32) COMMENT '更新人',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT UNSIGNED COMMENT '是否删除：0-未删除、1-已删'
) COMMENT '用户表';

DROP TABLE IF EXISTS oct_nail.service_item;
CREATE TABLE IF NOT EXISTS oct_nail.service_item (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(32) NOT NULL COMMENT '服务项目名称',
  `original_price` DECIMAL(10,2) COMMENT '原价格',
  `discounted_price` DECIMAL(10,2) COMMENT '折扣价格',
  `description` VARCHAR(255) COMMENT '描述介绍',
  `remark` VARCHAR(255) COMMENT '备注',
  -- 通用
  `created_by` VARCHAR(32) COMMENT '创建人',
  `updated_by` VARCHAR(32) COMMENT '更新人',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT UNSIGNED COMMENT '是否删除：0-未删除、1-已删'
) COMMENT '单项服务项目表';

DROP TABLE IF EXISTS oct_nail.service_item_image;
CREATE TABLE IF NOT EXISTS oct_nail.service_item_image (
  `fk_service_item_id` INT UNSIGNED NOT NULL COMMENT '服务项目 id',
  `fk_image_url` VARCHAR(600) NOT NULL COMMENT '图片 url'
) COMMENT '服务项目-图片中间表';

DROP TABLE IF EXISTS oct_nail.vip_balance_card;
CREATE TABLE IF NOT EXISTS oct_nail.vip_balance_card (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `description` VARCHAR(255) COMMENT '描述',
  `balance` DECIMAL(10,2) DEFAULT 0 COMMENT '余额',
  CHECK (`balance` >= 0),
  -- 通用
  `created_by` VARCHAR(32) COMMENT '创建人',
  `updated_by` VARCHAR(32) COMMENT '更新人',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT UNSIGNED COMMENT '是否删除：0-未删除、1-已删'
) COMMENT '会员余额卡表';

DROP TABLE IF EXISTS oct_nail.vip_times_card;
CREATE TABLE IF NOT EXISTS oct_nail.vip_times_card (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `fk_service_item_id` INT UNSIGNED NOT NULL COMMENT '服务项 id',
  `description` VARCHAR(255) COMMENT '描述',
  `times` TINYINT UNSIGNED DEFAULT 0 COMMENT '总次数',
  CHECK (`times` >= 0),
  -- 通用
  `created_by` VARCHAR(32) COMMENT '创建人',
  `updated_by` VARCHAR(32) COMMENT '更新人',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT UNSIGNED COMMENT '是否删除：0-未删除、1-已删'
) COMMENT '会员次卡表';

DROP TABLE IF EXISTS oct_nail.user_vip_card;
CREATE TABLE IF NOT EXISTS oct_nail.user_vip_card (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `fk_user_id` INT UNSIGNED COMMENT '用户 id',
  -- 余额卡
  `fk_vip_balance_card_id` INT UNSIGNED COMMENT '会员余额卡 id',
  `left_balance` DECIMAL(10,2) DEFAULT 0 COMMENT '剩余余额',
  -- 次卡
  `fk_vip_times_card_id` INT UNSIGNED COMMENT '会员次卡 id',
  `left_times` INT UNSIGNED COMMENT '次卡剩余次数',
  CHECK (`left_times` >= 0),
) COMMENT '用户- vip 卡中间表';

DROP TABLE IF EXISTS oct_nail.user_order;
CREATE TABLE IF NOT EXISTS oct_nail.user_order (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `fk_user_id` INT UNSIGNED NOT NULL COMMENT '用户 id',
  `fk_service_item_id` INT UNSIGNED COMMENT '服务项目 id',
  `status` TINYINT UNSIGNED COMMENT '状态：0-未支付、1-已完成、2-订单信息待完善',
  `pay_type` TINYINT UNSIGNED COMMENT '支付类型：0-其它（混合支付）、1-微信支付、2-余额卡支付、3-次卡支付',
  `pay_time` DATETIME COMMENT '支付时间',
  `start_time` DATETIME COMMENT '服务开始时间',
  `end_time` DATETIME COMMENT '服务结束时间',
  `user_comment` VARCHAR(255) COMMENT '用户评价',
  `user_rate` TINYINT UNSIGNED COMMENT '用户打星：1-5',
  `remark` VARCHAR(255) COMMENT '备注',
  -- 通用
  `created_by` VARCHAR(32) COMMENT '创建人',
  `updated_by` VARCHAR(32) COMMENT '更新人',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT UNSIGNED COMMENT '是否删除：0-未删除、1-已删除'
) COMMENT '用户订单表';

DROP TABLE IF EXISTS oct_nail.user_order_vip;
CREATE TABLE IF NOT EXISTS oct_nail.user_order_vip (
  `fk_user_order_id` INT COMMENT '用户订单 id',
  -- 余额卡
  `fk_vip_balance_card_id` INT UNSIGNED COMMENT '支付 vip 卡 id',
  `pay_amount` DECIMAL(10,2) DEFAULT 0 COMMENT '支付金额',
  `fk_vip_times_card_id` INT UNSIGNED COMMENT '支付 vip 卡 id',
  `pay_times` INT UNSIGNED COMMENT '次卡划扣次数'
) COMMENT '用户订单- vip 卡中间表';

DROP TABLE IF EXISTS oct_nail.vip_recharge_log;
CREATE TABLE IF NOT EXISTS oct_nail.vip_recharge_log (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `fk_user_vip_card_id` INT UNSIGNED COMMENT '用户 vip 卡 id',
  `recharge_balance` DECIMAL(10,2) DEFAULT 0 COMMENT '充值金额',
  `recharge_times` DECIMAL(10,2) DEFAULT 0 COMMENT '充值次数',
  `pay_amount` DECIMAL(10,2) DEFAULT 0 COMMENT '支付金额',
  CHECK (`recharge_balance` > 0 AND `recharge_times` > 0 AND `pay_amount` > 0),
  -- 通用
  `created_by` VARCHAR(32) COMMENT '创建人',
  `updated_by` VARCHAR(32) COMMENT '更新人',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT UNSIGNED COMMENT '是否删除：0-未删除、1-已删'
) COMMENT 'vip 卡充值记录表';

DROP TABLE IF EXISTS oct_nail.user_order_image;
CREATE TABLE IF NOT EXISTS oct_nail.user_order_image (
  `fk_user_order_id` INT UNSIGNED COMMENT '用户订单 id',
  `fk_image_url` VARCHAR(600) COMMENT '图片 url',
) COMMENT '用户订单-图片中间表';

DROP TABLE IF EXISTS oct_nail.image;
CREATE TABLE IF NOT EXISTS oct_nail.image (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `url` VARCHAR(600) UNIQUE COMMENT '图片地址',
  `is_show` TINYINT UNSIGNED DEFAULT 0 COMMENT '是否展示到首页：0-否、1-是',
  `show_description` VARCHAR(255) COMMENT '展示描述',
  -- 通用
  `created_by` VARCHAR(32) COMMENT '创建人',
  `updated_by` VARCHAR(32) COMMENT '更新人',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT UNSIGNED COMMENT '是否删除：0-未删除、1-已删'
) COMMENT '图片表';


ALTER TABLE oct_nail.user ADD FOREIGN KEY (`fk_vip_card_id`) REFERENCES oct_nail.user_vip_card (`id`);
ALTER TABLE oct_nail.service_item_image ADD FOREIGN KEY (`fk_service_item_id`) REFERENCES oct_nail.service_item(`id`);
ALTER TABLE oct_nail.service_item_image ADD FOREIGN KEY (`fk_image_url`) REFERENCES oct_nail.image(`url`) ON UPDATE CASCADE;
ALTER TABLE oct_nail.vip_times_card ADD FOREIGN KEY (`fk_service_item_id`) REFERENCES oct_nail.service_item(`id`);
ALTER TABLE oct_nail.user_vip_card ADD FOREIGN KEY (`fk_user_id`) REFERENCES oct_nail.user(`id`);
ALTER TABLE oct_nail.user_vip_card ADD FOREIGN KEY (`fk_vip_balance_card_id`) REFERENCES oct_nail.vip_balance_card(`id`);
ALTER TABLE oct_nail.user_vip_card ADD FOREIGN KEY (`fk_vip_times_card_id`) REFERENCES oct_nail.vip_times_card(`id`);
ALTER TABLE oct_nail.user_order ADD FOREIGN KEY (`fk_user_id`) REFERENCES oct_nail.user(`id`);
ALTER TABLE oct_nail.user_order ADD FOREIGN KEY (`fk_service_item_id`) REFERENCES oct_nail.service_item(`id`);
ALTER TABLE oct_nail.user_order_vip ADD FOREIGN KEY (`fk_vip_balance_card_id`) REFERENCES oct_nail.vip_balance_card(`id`);
ALTER TABLE oct_nail.user_order_vip ADD FOREIGN KEY (`fk_vip_times_card_id`) REFERENCES oct_nail.vip_times_card(`id`);
ALTER TABLE oct_nail.user_order_image ADD FOREIGN KEY (`fk_user_order_id`) REFERENCES oct_nail.service_item(`id`);
ALTER TABLE oct_nail.user_order_image ADD FOREIGN KEY (`fk_image_url`) REFERENCES oct_nail.image(`url`) ON UPDATE CASCADE;
ALTER TABLE oct_nail.vip_recharge_log ADD FOREIGN KEY (`fk_user_vip_card_id`) REFERENCES oct_nail.user_vip_card(`id`);
ALTER TABLE oct_nail.user_vip_card ADD FOREIGN KEY (`fk_user_id`) REFERENCES oct_nail.user(`id`);
ALTER TABLE oct_nail.user_vip_card ADD FOREIGN Key (`fk_vip_balance_card_id`) REFERENCES oct_nail.vip_balance_card(`id`);
ALTER TABLE oct_nail.user_vip_card ADD FOREIGN Key (`fk_vip_times_card_id`) REFERENCES oct_nail.vip_times_card(`id`);