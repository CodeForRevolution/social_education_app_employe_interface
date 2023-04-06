




module.exports.singup_page=function(req,res){
  res.render('singup.ejs');
}

module.exports.homepage=function(req,res){
  res.redirect('/home');
}

module.exports.home= async function(req,res){

res.render('home.ejs');
 

}



// module.exports.wrong=function(req,res){
//   res.render('wrong');
// }



module.exports.landing=function(req,res){
  res.render('landing');
}

