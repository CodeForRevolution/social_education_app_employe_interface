const { Router } = require('express');
const express =require('express');
const passport = require('passport');
const homecontroller=require('../controller/homeController');
const route=express.Router();
route.get('/',homecontroller.landing);
route.get('/home',passport.checkAuthentication,homecontroller.home);
route.get('/wrong',homecontroller.wrong);
route.use('/employe',require('./employe'));
route.use('/student',require('./student'));
route.use('/interview',require('./interview'));
module.exports=route;