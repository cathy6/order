/*
 * 描述：登录路由
 * 日期：2017-11-01
 * 作者：diaott
 */

const express = require('express');
const router = express.Router();
const loginHandler = require('../handler/loginHandler');

router.get('XXX', function(req, res, next){
	loginHandler.XXX(req, res, next)
})

module.exports = router;