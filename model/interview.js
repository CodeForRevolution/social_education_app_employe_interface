
const mongoose=require('mongoose');
const student = require('./student');
const intervieweSchema=new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
   position:{
    type:String,
   },
   date:{
    type:Date,
    required:true
   },
   salary:{
    type:String,
    required:true
   },
   skill:[
     {
     type:String
    }
],
 student:[
    
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'student',
   
    }
    
 ]

},{
    timestamps:true
});

const interview=mongoose.model('interview',intervieweSchema);
module.exports=interview;