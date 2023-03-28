const interview = require('../model/interview');
const Interview=require('../model/interview');
module.exports.createForm=async function(req,res){
    res.render('interviewForm.ejs');
}
module.exports.createInterview= async function(req,res){
    console.log('you hit the create interview');


let interview=await Interview.create(req.body);
res.redirect('/home')


}