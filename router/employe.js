const express=require('express');
const passport=require('passport');
const employe_controller=require('../controller/employe_controller')
const homeController=require('../controller/homeController')
const route=express.Router();
route.post('/create',employe_controller.create);
route.post('/login',passport.authenticate(
  'local',
  {failureRedirect:'/wrong'}  
),homeController.homepage);
module.exports=route