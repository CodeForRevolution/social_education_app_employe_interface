require('dotenv').config();
const express =require('express');
const cookieParser=require('cookie-parser');
const flash=require('connect-flash');
const App=express();
const port=3000;
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const mongoStore=require('connect-mongo')(session);
const bodyparser=require('body-parser');
App.use(bodyparser.urlencoded({extended:true}))
App.use(cookieParser());
const  custmiddleweare=require('./config/middleweare');
const expressLayouts=require('express-ejs-layouts');
const { initialize } = require('passport');
App.use(expressLayouts);
App.set('layout extractStyles',true);//setting the where css file should be refer in the layout page
App.set('layout extractScripts',true);
App.use(express.static('./assets'));
App.set('view engine','ejs');
App.set('views','view');
App.use(session({
    name:'first-skill-test',
    secret: process.env.SECRET_KEY_SESSION,
    saveUninitialized:false,  //change in deployement
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new mongoStore({
       mongooseConnection:db,
       autoRemove:'disabled'
    },function(err){
console.log('error in setting the mongos store',err);
    })
}));

App.use(passport,initialize);
App.use(passport.session());
App.use(flash()) ;  //setting flash for flash message
App.use(custmiddleweare.setFlash);
App.use(passport.setAuthenticatedUser);
const route=require('./router/index');
const student = require('./model/student');
App.use('/',route);



App.listen(port,function(){
    console.log('server is started');
})