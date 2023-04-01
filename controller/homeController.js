
const Interview=require('../model/interview');
const Student_csv=require('../model/student_csv');
const { populate } = require('../model/student');
const Student=require('../model/student');
const fs=require('fs');
const {Parser}=require('json2csv');
const student_csv = require('../model/student_csv');


module.exports.singup_page=function(req,res){
  res.render('singup.ejs');
}

module.exports.homepage=function(req,res){
  res.redirect('/home');
}

module.exports.home= async function(req,res){


  var info=  [  
    ]
  

  console.log('array is',info);
  // let interview=await Interview.find({}).populate('student');
  let interview=await Interview.find({}).populate('student');
  
  let student=await Student.find({}).populate({
    path:'interview',
    populate:{
      path:'document'
    },
 
    
  })

for(let student_ of student){

for(let i=0;i<student_.interview.length;i++){


  info.push({

    NAME:student_.name,
    COLLEGE:student_.college,
    STATUS:student_.status,
    DSA:student_.dsa,
    WEB:student_.WEBDEV,
    REACT:student_.react,
    COMPANYE:student_.interview[i].document.name,
    RESULT:student_.interview[i].value,
    I_DATE:student_.interview[i].document.createdAt
    
  })




}

if(student_.interview.length==0){
  info.push({

    NAME:student_.name,
    COLLEGE:student_.college,
    STATUS:student_.status,
    DSA:student_.dsa,
    WEB:student_.WEBDEV,
    REACT:student_.react,
    COMPANY:'Not allocated',
    RESULT:'NaN',
    I_DATE:'NaN'
    
  })
}

}


console.log('getging info',info); 
const obj=new Parser();
const csv=obj.parse(info);
console.log('you got the csv data',csv);
fs.writeFile(`${Date.now()}.csv`,csv,function(err){
  if(err){
    console.log('error in csvv');
  }
  console.log('file is save');
})

    res.render('home',{
      Student:student,
      Interview:interview
        });

  
   
  
  
 

}
module.exports.wrong=function(req,res){
  res.render('wrong');
}
module.exports.landing=function(req,res){
  res.render('landing');
}