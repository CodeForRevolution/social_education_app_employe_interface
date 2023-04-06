const express=require('express');
const passport=require('passport');
const interview = require('../model/interview');
const interview_controller=require('../controller/interview_controller');
const route=express.Router();
// route.get('/create',passport.checkAuthentication,interview_controller.createForm);
route.post('/create',passport.checkAuthentication,interview_controller.createInterview);
route.get('/interviewList',passport.checkAuthentication,interview_controller.interviewList);
module.exports=route;