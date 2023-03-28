const Employe=require('../model/employe')
module.exports.create= async function(req,res){
    console.log('enter into create function',req.body);

    if(req.body.password!=req.body.confirmpassword){
        res.redirect('/wrong');
    }
let employe=await Employe.findOne({email:req.body.email});
if(employe){
    console.log('user is exist');
    res.redirect('/wrong');
}
    Employe.create(req.body);
}

module.exports.login=async function(req,res){
//     console.log('hit the login page ',req.body);
//  let employe=await   Employe.findOne({email:req.body.email});
//  if( employe && employe.password==req.body.password){
//     console.log(employe);
//  }else{
//     console.log('login credential are incorrect');
//  }


res.redirect('/home');

}