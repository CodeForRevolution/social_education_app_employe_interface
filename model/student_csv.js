const mongoose=require('mongoose');

const student_csv_schema= new  mongoose.Schema({
    NAME:{
        type:String,
    },
    COLLEGE:{
        type:String,
    },
    STUDENT_ID:{
        type:String,
    },
    STUDENT_STATUS:{
        type:String,
    },
    DSA_SCORE:{
        type:String,
    },
    WEB_SCORE:{
        type:String,
    },
    REACT_SCORE:{
        type:String,
    },
    INTERVEIW_COMPANYE:{
        type:String,
    }

})

const student_csv= mongoose.model('student_csv',student_csv_schema);
module.exports=student_csv;