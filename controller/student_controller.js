const interview = require('../model/interview');
const Interview = require('../model/interview');
const Student = require('../model/student');




const Student_csv = require('../model/student_csv');
const fs = require('fs');
const { Parser } = require('json2csv');









module.exports.newstudent = async function (req, res) {
  let student = await Student.create(req.body);
  console.log('chekcing typ of', typeof (parseInt(student.dsa, 10)));
  student.total = parseInt(student.dsa, 10) + parseInt(student.react, 10) + parseInt(student.WEBDEV, 10);
  student.save();
  console.log(req.body);
  res.redirect('back')
}
module.exports.studentform = async function (req, res) {
  console.log('you hit the form again');
  res.render('create_student.ejs');
}






module.exports.studentList = async function (req, res) {

  let interview = await Interview.find({}).populate('student');

  var search = new Object;
  if (req.query.name != undefined && req.query.name != '') {
    console.log('come to add name', req.query.name);//puting
    search.name = req.query.name
  }

  if (req.query.batch != undefined && req.query.batch != '') {
    console.log('come to add batch', req.query.name);
    search.batch = req.query.batch;
  }
  if (req.query.status != undefined && req.query.status != '') {
    console.log('come to add batch', req.query.status);
    search.status = req.query.status;
  };





  if (req.query.name != undefined || req.query.batch != undefined) {

    if (search.name) {

      delete search.name;

      let student = await Student.find(


        { name: { $regex: '.*' + req.query.name + '.*', $options: 'i' } },
        search

      ).populate({
        path: 'interview',
        populate: {
          path: 'document'

        },


      })



      res.render('studentList.ejs', {
        Student: student,
        Interview: interview
      });


    }




    console.log('searching by condition', search);
    let student = await Student.find(
      search

    ).populate({
      path: 'interview',
      populate: {
        path: 'document'

      },


    })



    res.render('studentList.ejs', {
      Student: student,
      Interview: interview
    });




  } else {


    let student = await Student.find({
      search
    }
    ).populate({
      path: 'interview',
      populate: {
        path: 'document'

      },


    })



    res.render('studentList.ejs', {
      Student: student,
      Interview: interview
    });

  }





}





module.exports.studentCsv = async function (req, res) {
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
        COMPANY: 'Not allocated',
        RESULT: 'NaN',
        I_DATE: 'NaN'

      })
    }

  }


  res.render('studentcsv', {
    Info: info,
    Student: student,
    Interview: interview,

  });


}









module.exports.alocateInterveiw = async function (req, res) {

  try {


    console.log('you hit the alocate interview', req.body);
    let student = await Student.findById(req.body.student_id);
    console.log(student);
    let interview = await Interview.findById(req.body.interivew_id);
    student.interview.push(
      {
        value: 'onHold',
        document: req.body.interivew_id
      }

    )
    student.save();
    interview.student.push(req.body.student_id);
    interview.save();


    res.redirect('back');

  } catch (error) {
    console.log('yout got the error from try catch', error)
    res.redirect('/home')

  }



}

module.exports.result = async function (req, res) {

  try {

    let student = await Student.findById(req.body.student_id).populate({
      path: 'interview',
      populate: {
        path: 'document'
      }
    });
    let interview = await Interview.findById(req.body.interivew_id);

    for (let i = 0; i < student.interview.length; i++) {
      console.log('seeing the docuemnt', student.interview[i].document._id + '  id of sending interview' + req.body.interivew_id);
      if (student.interview[i].document._id == req.body.interivew_id) {
        student.interview[i].value = req.body.value
        if (req.body.value == 'pass') {
          student.status = 'placed';
        }
        console.log(student);
      }
    }
    student.save();
    res.redirect('back');

  } catch (error) {

    console.log('you catch the error from try catch', error);
    res.redirect('/home')

  }

}



module.exports.downloadCsv= async function(req,res){


  console.log('you hit the download section')

  var info = [
  ];


  console.log('array is', info);
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
        COMPANY: 'Not allocated',
        RESULT: 'NaN',
        I_DATE: 'NaN'

      })
    }

  }

 
  const obj = new Parser();
  const csv = obj.parse(info);


res.attachment("information.csv");
res.status(200).send(csv)



}
