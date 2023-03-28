const interview = require('../model/interview');
const Interview = require('../model/interview');
const Student =require('../model/student');
module.exports.newstudent= async function(req,res){
 let student= await   Student.create(req.body);
//  student.interview.push({
//     value:'shakir',
//     document:'641e9c70065a5fd77813bb67'
//  });
//  student.save();
   console.log(req.body);
   res.redirect('back')
}
module.exports.studentform= async function(req,res){
    console.log('you hit the form again');
    res.render('create_student.ejs');
}

module.exports.alocateInterveiw= async function(req,res){

try {


    console.log('you hit the alocate interview',req.body);
    let student=await Student.findById(req.body.student_id);
    console.log(student);
   let interview=await Interview.findById(req.body.interivew_id);
   student.interview.push(
   {
    value:'onHold',
    document:req.body.interivew_id
   }
  
   )
   student.save();
   interview.student.push(req.body.student_id);
   interview.save();

   
   res.redirect('/home');
    
} catch (error) {
    console.log('yout got the error from try catch',error)
    res.redirect('/home')
    
}

   
    
}

module.exports.result= async function(req,res){

try {

    let student=await Student.findById(req.body.student_id).populate({
        path:'interview',
        populate:{
            path:'document'
        }
       });
       let interview=await Interview.findById(req.body.interivew_id);
    
      for(let i=0;i<student.interview.length;i++){
        console.log('seeing the docuemnt',student.interview[i].document._id+'  id of sending interview'+req.body.interivew_id);
        if(student.interview[i].document._id==req.body.interivew_id){
            student.interview[i].value=req.body.value
            student.save();
        }
      }
    res.redirect('/home');
    
} catch (error) {

    console.log('you catch the error from try catch',error);
    res.redirect('/home')
    
}
   
}