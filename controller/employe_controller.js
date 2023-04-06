const Employe = require('../model/employe')
module.exports.create = async function (req, res)
 {



try {

    
    console.log('enter into create function', req.body);

    if (req.body.password != req.body.confirmpassword) {
        res.redirect('/wrong');
    }
    let employe = await Employe.findOne({ email: req.body.email });
    if (employe) {
        console.log('user is exist');
        res.redirect('/wrong');
    }
    Employe.create(req.body);
    res.redirect('/')

    
} catch (error) {
    console.log('error in working ',error);
    res.redirect('back');
    
}






}



module.exports.login = async function (req, res) {
    res.redirect('/home');

}

module.exports.logout=async function(req,res){


    
    req.logout(function(err){
      if(err){
          return next(err);
      }
    
  });
  
  return res.redirect('/');
  }