const express=require('express');
const passport=require('passport');
const student_controller=require('../controller/student_controller');
const route=express.Router();
route.post('/newstudent',student_controller.newstudent)
// route.get('/create',student_controller.studentform);
route.post('/allocateInterview',passport.checkAuthentication,student_controller.alocateInterveiw);
route.post('/result',passport.checkAuthentication,student_controller.result);
route.get('/studentList',passport.checkAuthentication,student_controller.studentList);
route.get('/studentCsv',passport.checkAuthentication,student_controller.studentCsv);
route.get('/downwloadcsv',passport.checkAuthentication,student_controller.downloadCsv);
module.exports=route;