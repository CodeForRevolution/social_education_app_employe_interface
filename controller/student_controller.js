
const Interview = require('../model/interview');
const Student = require('../model/student');

const { Parser } = require('json2csv');



module.exports.newstudent = async function (req, res) {
  let student = await Student.create(req.body);
  student.total = parseInt(student.dsa, 10) + parseInt(student.react, 10) + parseInt(student.WEBDEV, 10);
  student.save();
  console.log(req.body);
  req.flash('success','New student  created');
  res.redirect('back')
}



module.exports.studentList = async function (req, res) {


try {

  
  let interview = await Interview.find({}).populate('student');
  var student = await Student.find(
    
        ).populate({
          path: 'interview',
          populate: {
            path: 'document'
    
          },
        })

if(req.query.name!=undefined&& req.query.name!='')
{
  console.log('you hit the search name')
    var filter = student.filter(function (a) {
      if (a.name.toLowerCase().includes(req.query.name.toLowerCase())) {  //filtering the student as per name
        return a;
      }
    })

    console.log('your fileter element was',filter);
    student=filter;
}




if(req.query.status!=undefined&& req.query.status!='')
{
  console.log('you hit the search status',req.query.status)
    var filter = student.filter(function (a) {
      if (a.status===req.query.status) { //filtering the student as per status 
        
        return a;
      }
    })
    console.log('your fileter element was',filter);

    student=filter;
}



if(req.query.batch!=undefined&& req.query.batch!='')
{

  console.log('you hit the search status',req.query.batch)
    var filter = student.filter(function (a) {
      if (a.batch===req.query.batch) {             //filtering the student as per batch 
        
        return a;
      }
    })

    console.log('your fileter element was',filter);

    student=filter;
}




if(req.query.interview!=undefined&& req.query.interview!='')
{


  console.log('you are sending the student to interview is',student)
  console.log('you hit the search interview',req.query.interview)
    var filter = student.filter(function (a) {
      for(let i=0;i<a.interview.length;i++){
        if (a.interview[i].document.name===req.query.interview) {    
             return a;                                                   //filtering the student as per alocated
        }      
      }   
    }) 

    console.log('your fileter element was',filter);

    student=filter;
}






   res.render('studentList.ejs', {
      Student: student,
      Interview: interview
    });

  
} catch (error) {

  res.flash('error','error in filtering data');
  res.redirect('back');
  
}



}





module.exports.studentCsv = async function (req, res) {
 try {


  var info = [ ];//made a array to store all the information about the student
                 //so making the csv file will be easy
  let interview = await Interview.find({}).populate('student');

  let student = await Student.find({}).populate({
    path: 'interview',
    populate: {
      path: 'document'
    },


  })














  for (let student_ of student) {

    for (let i = 0; i < student_.interview.length; i++) {


      info.push({

        NAME: student_.name,
        COLLEGE: student_.college,
        STATUS: student_.status,
        DSA: student_.dsa,
        WEB: student_.WEBDEV,
        REACT: student_.react,
        BATCH: student_.batch,
        COMPANY: student_.interview[i].document.name,
        RESULT: student_.interview[i].value,
        I_DATE: student_.interview[i].document.createdAt

      })




    }

    if (student_.interview.length == 0) {
      info.push({

        NAME: student_.name,
        COLLEGE: student_.college,
        STATUS: student_.status,
        DSA: student_.dsa,
        WEB: student_.WEBDEV,
        REACT: student_.react,
        BATCH: student_.batch,
        COMPANY: 'Not allocated',
        RESULT: 'NaN',
        I_DATE: 'NaN'

      })
    }

  }


  res.render('studentcsv', {
    Info: info,//sending the info object to the view file
    Student: student,
    Interview: interview,

  });
  
 } catch (error) {
  console.log('error ',error)
  res.redirect('/');
 }


}









module.exports.alocateInterveiw = async function (req, res) {
//alocating the user to the particular requested interivew 
  try {

    let student = await Student.findById(req.body.student_id);
    console.log(student);
    let interview = await Interview.findById(req.body.interivew_id);
    student.interview.push(
      {
        value: 'onHold',//making the default interivew result as on hold
        document: req.body.interivew_id
      }

    )
    student.save();
    interview.student.push(req.body.student_id);//putting the student document into the interview student array 
    interview.save();
    req.flash('success','interview is allocated');
    res.redirect('back');

  } catch (error) {
    console.log('yout got the error from try catch', error)
    res.redirect('/home')

  }
}



module.exports.result = async function (req, res) {

  //handling the result of the interivew from here
  try {
    let student = await Student.findById(req.body.student_id).populate({
      path: 'interview',
      populate: {
        path: 'document'
      }
    });
   
    for (let i = 0; i < student.interview.length; i++) {
      console.log('seeing the docuemnt', student.interview[i].document._id + '  id of sending interview' + req.body.interivew_id);
      if (student.interview[i].document._id == req.body.interivew_id) {
        student.interview[i].value = req.body.value//updating the student result here 
        if (req.body.value == 'pass') {//if the student passed the interview then setting the student status as placed
          student.status = 'placed';
        }
        console.log(student);
      }
    }
    student.save();//after updating the student we have to save the document
    req.flash('success','Response send to student');
    res.redirect('back');

  } catch (error) {

    console.log('you catch the error from try catch', error);
    res.redirect('/home')

  }

}



module.exports.downloadCsv = async function (req, res) {
  var info = [
  ];
  let interview = await Interview.find({}).populate('student');
  let student = await Student.find({}).populate({
    path: 'interview',
    populate: {
      path: 'document'
    },
  })

  for (let student_ of student) {
    for (let i = 0; i < student_.interview.length; i++) {
      info.push({
        NAME: student_.name,
        COLLEGE: student_.college,
        STATUS: student_.status,
        DSA: student_.dsa,
        WEB: student_.WEBDEV,
        REACT: student_.react,
        BATCH: student_.batch,
        COMPANY: student_.interview[i].document.name,
        RESULT: student_.interview[i].value,
        I_DATE: student_.interview[i].document.createdAt

      })
    }
    if (student_.interview.length == 0) {
      info.push({
        NAME: student_.name,
        COLLEGE: student_.college,
        STATUS: student_.status,
        DSA: student_.dsa,
        WEB: student_.WEBDEV,
        REACT: student_.react,
        BATCH: student_.batch,
        COMPANY: 'Not allocated',
        RESULT: 'NaN',
        I_DATE: 'NaN'
      })
    }

  }
  const obj = new Parser();
  const csv = obj.parse(info);
  console.log('your csv was',csv);
  res.attachment("information.csv");//attching the file to the request
  res.status(200).send(csv)//making to download the file onclick the link


}
 

module.exports.delete=async function(req,res){
try {

  console.log('you hit delete',req.params);
  let student= await Student.deleteOne({_id:req.params.id})
  res.redirect('back');
  
} catch (error) {
  
  console.log(error);
  res.redirect('back');
  
}
}