const passport=require('passport');
const Employee=require('../model/employe')
const localStrategy=require('passport-local').Strategy;

passport.use(new localStrategy({
    usernameField:'email'
},
async function(email,password,done){
    //find the use and establish identity

    



  try {


    let employe=await  Employee.findOne({email:email});
    if(employe && employe.password==password ){
        console.log('sending the employe to the authentication next ')
        return done(null,employe);

    }else{
        console.log('user id or password is wrong');
        return done(null,false);
    }
    
  } catch (error) {
    console.log('error is find ',error);
  }




}
));


passport.serializeUser(function(employe,done){
done(null,employe._id);//store the user employe is in encrypted format and setting into the cookie
})
passport.deserializeUser( async function(id,done){
    let employe=await Employee.findById(id) ;
   if(employe){
    // console.log('deserialize the user',employe);
    return done(null,employe);
   }else{
    // console.log('cant get the employe');
    return done(err);
   }
})

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
    return    res.redirect('/wrong');
    }
   
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        // console.log('checking the which user',req.user);
        res.locals.employe=req.user;

        // console.log('checking does we put the user',res.locals.employe);
    }
    next();
}

module.exports=passport;