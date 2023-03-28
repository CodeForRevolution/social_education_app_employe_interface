const express=require('express');
const interview = require('../model/interview');
const interview_controller=require('../controller/interview_controller');
const route=express.Router();
route.get('/create',interview_controller.createForm);
route.post('/create',interview_controller.createInterview);
module.exports=route;