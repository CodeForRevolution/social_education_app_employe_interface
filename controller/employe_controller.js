const Employe = require('../model/employe')
module.exports.create = async function (req, res)
 {



try {


    if (req.body.password != req.body.confirmpassword) {
        req.flash('success','password should be same as confirm-password ');
        res.redirect('back')
    }
    let employe = await Employe.findOne({ email: req.body.email });
    if (employe) {
        req.flash('error','Employe already  exist with this email');
        res.redirect('back');
    }
    Employe.create(req.body);
    req.flash('success','Employe created successfully');
    res.redirect('/')

    
} catch (error) {
    console.log('error in working ',error);
    res.redirect('back');
    
}


}



module.exports.login = async function (req, res) {
    req.flash('success','LOG-IN successfully');
    res.redirect('/home');
}

module.exports.logout=async function(req,res){

    req.logout(function(err){
      if(err){
          return next(err);
      }
      req.flash('success','LOG-OUT successfully');
    
  });
  req.flash('success','LOG-OUT successfully');
  return res.redirect('/');
  }