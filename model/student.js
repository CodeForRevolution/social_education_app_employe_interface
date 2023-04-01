const mongoose=require('mongoose');
const studenteSchema=new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
   email:{
    type:String,
    require:true,
   },
   college:{
    type:String,
    require:true,
   },
   status:{
    type:String,
  enum:['placed','not-placed'],
  default:'not-placed'    
   },
  batch:{
    type:String
  },
  WEBDEV:{
    type:String
  },
  total:{
    type:String
  },
  dsa:{
    type:String
  },

  
  react:{
    type:String
  },
  allInterview:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'interview'
  }],

  interview:[  
{

     
       

        value:{
          type:String,
         enum:['pass','fail','onHold','Didn’t Attempt'],
         default:'onHold'

        },
        document:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'interview',
          
        }
       
      }
  ]
 

},{
    timestamps:true
});

const student=mongoose.model('student',studenteSchema);
module.exports=student;

