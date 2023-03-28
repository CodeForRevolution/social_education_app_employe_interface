const mongoose=require('mongoose');
const employeeSchema=new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
   email:{
    type:String,
    require:true,
    unique: true,
    dropDups: true 
   },
   password:{
    type:String,
    require:true
   }
  

},{
    timestamps:true
});

const Employe=mongoose.model('Employe',employeeSchema);
module.exports=Employe;

