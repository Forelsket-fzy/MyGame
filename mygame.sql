/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80041 (8.0.41)
 Source Host           : localhost:3306
 Source Schema         : mygame

 Target Server Type    : MySQL
 Target Server Version : 80041 (8.0.41)
 File Encoding         : 65001

 Date: 03/07/2025 23:09:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `category_id` int NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '分类名称',
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '大型网游');
INSERT INTO `category` VALUES (2, '单机');
INSERT INTO `category` VALUES (3, '动作RPG');
INSERT INTO `category` VALUES (4, '独立游戏');
INSERT INTO `category` VALUES (5, '生存');
INSERT INTO `category` VALUES (6, 'FPS');
INSERT INTO `category` VALUES (7, '二刺螈');
INSERT INTO `category` VALUES (8, '模拟经营');

-- ----------------------------
-- Table structure for game
-- ----------------------------
DROP TABLE IF EXISTS `game`;
CREATE TABLE `game`  (
  `video` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `game_id` int NOT NULL AUTO_INCREMENT COMMENT '游戏ID',
  `game_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '游戏名字',
  `game_category` int NULL DEFAULT NULL COMMENT '游戏分类',
  `price` decimal(10, 2) NOT NULL COMMENT '价格',
  `cover_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '封面',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '游戏描述',
  `release_date` datetime NOT NULL COMMENT '发布日期',
  `isshow` int NOT NULL COMMENT '是否轮播',
  `score` int NOT NULL COMMENT '评分',
  PRIMARY KEY (`game_id`) USING BTREE,
  INDEX `game_category`(`game_category` ASC) USING BTREE,
  CONSTRAINT `game_ibfk_1` FOREIGN KEY (`game_category`) REFERENCES `category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of game
-- ----------------------------
INSERT INTO `game` VALUES (NULL, 1, '荒野大镖客救赎2', 2, 198.00, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/%E8%8D%92%E9%87%8E%E5%A4%A7%E9%95%96%E5%AE%A22.png', '《Red Dead Redemption 2》，简称RDR2，是Rockstar San Diego工作室制作，Rockstar Games公司发行的一款动作冒险类开放世界游戏，为2010年该公司发行的《Red Dead Redemption》的正统续作。\r\n游戏中述说亚瑟·摩根和声名狼藉的范德林德帮派的传奇故事，让玩家体验在19世纪的最后岁月里横跨美国的亡命之旅.', '2018-10-26 00:00:00', 1, 5);
INSERT INTO `game` VALUES (NULL, 2, '赛博朋克2077', 6, 99.00, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/%E8%B5%9B%E5%8D%9A%E6%9C%8B%E5%85%8B%202077.png', '《赛博朋克 2077》是一款以未来都市夜之城为背景的开放世界动作冒险角色扮演游戏。玩家扮演赛博朋克雇佣兵，通过完成任务、累积声望和自定义角色进行冒险，玩家的决策将影响剧情走向和游戏世界。', '2020-12-10 00:00:00', 1, 3);
INSERT INTO `game` VALUES (NULL, 3, '文明VI', 8, 39.99, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/wm.png', '一款经典的策略游戏，玩家可以建立自己的文明。', '2016-10-21 00:00:00', 1, 4);
INSERT INTO `game` VALUES (NULL, 4, '原神', 7, 0.00, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/ys.png', '《文明6》是Firaxis Games开发，2K Games发行的历史策略回合制游戏，于2016年10月21日发行PC版本，2018年11月16日登陆Switch平台，2019年11月22日发布了XboxOne、PS4版本，为《文明》系列第六部。 [1]\r\n游戏中玩家建立起一个帝国，并接受时间的考验。玩家将创建及带领自己的文明从石器时代迈向信息时代，并成为世界的领导者。在尝试建立起世界上赫赫有名的伟大文明的过程中，玩家将启动战争、实行外交、促进文化，同时正面对抗历史上的众多领袖。', '2020-09-08 00:00:00', 0, 1);
INSERT INTO `game` VALUES (NULL, 5, '空洞骑士', 4, 59.00, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/kdss.png', '空洞骑士（The Hollow Knight）是《空洞骑士》主线的最终 Boss 之一，在游戏剧情中占有重要地位。\r\n玩家在游戏开头就可以见到空洞骑士的外壳破裂、感染泄漏的场景。随着对剧情的推进，玩家们能够逐渐了解这位悲剧英雄的身世与经历，并最终接替其未尽的使命，或在其帮助下将散布感染的辐光彻底击败。\r\n游戏中，空洞骑士通常身居黑卵，它的另一形态“纯粹容器”则在神居中登场，令玩家得以见证其昔日的力量。而玩家所操控的小骑士在接替它封印辐光后，亦可被称为“空洞骑士”。', '2017-04-28 00:00:00', 1, 5);
INSERT INTO `game` VALUES (NULL, 6, '黑神话：马楼', 2, 298.00, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/hh.png', '《黑神话：悟空》是由杭州游科互动科技有限公司开发 [37]，浙江出版集团数字传媒有限公司出版的西游题材单机动作角色扮演游戏 [39]。\r\n该作以中国四大名著之一、吴承恩所著长篇小说《西游记》为背景设定，借用《西游记》自身的故事作为前传，讲述取经之后孙悟空因放弃佛位引发天庭对其再次征伐之后的故事。在游戏中，玩家将扮演一位“天命人”，为了探寻昔日传说的真相，踏上一条充满危险与惊奇的西游之路.', '2024-08-20 00:00:00', 1, 5);
INSERT INTO `game` VALUES (NULL, 7, 'CSGO', 6, 0.00, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/CSGO.png', '《反恐精英：全球攻势》，原名Counter-Strike: Global Offensive，是一款由VALVE与Hidden Path Entertainment合作开发、Valve Software发行的第一人称射击游戏，于2012年8月21日在欧美地区正式发售，国服发布会于2017年4月11日在北京召开。 [1-2]游戏为《反恐精英》系列游戏的第四款作品（不包括Neo和Online等衍生作品）。', '2012-08-21 00:00:00', 0, 4);
INSERT INTO `game` VALUES (NULL, 8, '英雄联盟', 1, 0.00, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/lol.png', '《英雄联盟》（League of Legends，简称LOL）是由美国拳头游戏（Riot Games）开发、中国内地由腾讯游戏代理运营的英雄对战MOBA竞技网游。游戏里拥有数百个个性英雄，并拥有排位系统、符文系统等特色系统。', '2009-10-27 00:00:00', 0, 2);
INSERT INTO `game` VALUES (NULL, 9, '星露谷物语', 8, 24.00, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/xlg.png', '《星露谷物语》是由ConcernedApe单人开发，并与《星界边境》的制作者Chucklefish一同参与发行的一款开放式乡村模拟经营类游戏，于2016年2月27日正式上市。 [13-14]2016年中先后在PC、PS4和Xbox One上发售，之后又登陆了Switch、Vita、iOS和Android平台。', '2018-05-22 00:00:00', 0, 5);
INSERT INTO `game` VALUES (NULL, 10, '永劫无间', 1, 98.00, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/yjwj.png', '《永劫无间 [1]》是由网易旗下“24 Entertainment工作室”开发的一款多人动作竞技游戏 [2]，于2021年7月8日开启不删档测试，《永劫无间》Steam全球公测于2021年8月12日10：00正式开服 [3-4]。同年12月9日，《永劫无间》正式登陆EPIC商城 [50]。2022年6月23日《永劫无间》正式登陆Xbox主机，首发加入XGP [49]。2023年7月14日起，《永劫无间》由原本的买断制将转为免费游戏，并于同日登陆 PS5 平台。', '2021-07-08 00:00:00', 0, 5);
INSERT INTO `game` VALUES (NULL, 11, '艾尔登法环', 3, 298.00, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/ardfh.png', '《艾尔登法环》是From Software开发，万代南梦宫发行的黑暗幻想风开放世界角色扮演动作游戏。 [15]\r\n该游戏于2022年2月25日于Steam、PlayStation、Xbox One、Xbox Series X/Xbox Series S上发售，售价298元。 [2-3] [6-7]2024年6月21日，游戏 DLC“黄金树幽影”实装，售价198元。 [74-75] [78-79]2025年，《褪色版》于Nintendo Switch 2平台上架，该版本包含PC与PS端相当于本体与DLC的全部内容。', '2023-09-23 00:00:00', 0, 4);
INSERT INTO `game` VALUES (NULL, 12, '饥荒', 5, 6.00, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/jh.png', '《饥荒》是由Klei Entertainment开发的一款动作冒险类求生游戏，于2013年4月23日在PC上发行，2015年7月9日在iOS发布口袋版。 [1]\r\n游戏讲述的是关于一名科学家被恶魔传送到了一个神秘的世界，玩家将在这个异世界生存并逃出这个异世界的故事。', '2013-04-23 00:00:00', 1, 5);
INSERT INTO `game` VALUES (NULL, 21, '幻兽帕鲁', 1, 123.00, 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/image/4.png', '123', '2025-07-03 21:33:48', 0, 2);

-- ----------------------------
-- Table structure for gamelove
-- ----------------------------
DROP TABLE IF EXISTS `gamelove`;
CREATE TABLE `gamelove`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户id',
  `game_id` int NOT NULL COMMENT '游戏ID',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `game_id`(`game_id` ASC) USING BTREE,
  CONSTRAINT `gamelove_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `gamelove_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gamelove
-- ----------------------------
INSERT INTO `gamelove` VALUES (1, 1, 1);
INSERT INTO `gamelove` VALUES (2, 1, 3);
INSERT INTO `gamelove` VALUES (3, 1, 5);
INSERT INTO `gamelove` VALUES (4, 1, 12);
INSERT INTO `gamelove` VALUES (29, 2, 6);
INSERT INTO `gamelove` VALUES (38, 2, 4);
INSERT INTO `gamelove` VALUES (42, 1, 2);
INSERT INTO `gamelove` VALUES (43, 1, 4);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `order_id` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int NOT NULL COMMENT '用户id',
  `game_id` int NOT NULL COMMENT '游戏ID',
  `amount` decimal(10, 2) NOT NULL COMMENT '金额',
  `status` enum('pending','completed','failed') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'pending',
  PRIMARY KEY (`order_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `game_id`(`game_id` ASC) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('123321123312', 1, 12, 1.00, 'completed');
INSERT INTO `orders` VALUES ('3124117788', 1, 6, 1.00, 'pending');
INSERT INTO `orders` VALUES ('5066170347', 1, 1, 1.00, 'pending');
INSERT INTO `orders` VALUES ('5438234648', 1, 5, 1.00, 'pending');
INSERT INTO `orders` VALUES ('7818820150', 1, 4, 1.00, 'pending');
INSERT INTO `orders` VALUES ('8182248550', 1, 3, 1.00, 'pending');
INSERT INTO `orders` VALUES ('9827106944', 2, 4, 1.00, 'pending');
INSERT INTO `orders` VALUES ('ORD1003', 2, 2, 1.00, 'pending');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '邮箱',
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户密码--MD5加密',
  `avater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '头像url',
  `balance` decimal(10, 2) NULL DEFAULT 0.00 COMMENT '账户余额',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `status` int NOT NULL COMMENT '账号权限\r\n\r\n',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('f18055762387@126.com', 1, '房争远', '123456', 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/avater/1/1.jpg', 8188.01, '2025-06-27 14:47:26', 1);
INSERT INTO `user` VALUES ('123123@123.com', 2, '刘翔', '123123', 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/avater/1/2.jpg', 99.00, '2025-06-30 15:20:05', 1);
INSERT INTO `user` VALUES ('123123@qq.com', 25, '施天磊', '123123', NULL, 0.00, '2025-07-03 20:00:40', 0);
INSERT INTO `user` VALUES ('321312@123.com', 26, '胡京', '123123', NULL, 0.00, '2025-07-03 20:01:01', 0);

SET FOREIGN_KEY_CHECKS = 1;
