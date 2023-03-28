const express=require('express');
const student_controller=require('../controller/student_controller');
const route=express.Router();
route.post('/newstudent',student_controller.newstudent)
route.get('/create',student_controller.studentform);
route.post('/allocateInterview',student_controller.alocateInterveiw);
route.post('/result',student_controller.result);
module.exports=route;