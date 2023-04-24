const interview = require('../model/interview');
const Interview = require('../model/interview');
const Student = require('../model/student');


module.exports.createInterview = async function (req, res) {


  try {

    let interview = await Interview.create(req.body);
    req.flash('success','interview is created');
    res.redirect('back')
    
  } catch (error) {
    console.log(error);
    res.redirect('back')
  }


}

module.exports.interviewList = async function (req, res) {
//sending the data to the interviewLIist page 

    var search = new Object;
    if (req.query.name != undefined && req.query.name != '') {
        search.name = req.query.name;
    }
    if (req.query.position != undefined && req.query.position != '') {
        search.position = req.query.position;
    }

    if (search.name != undefined || search.position != undefined) {
        //sending the filtered  data to the page interviewList.ejs
        let interview = await Interview.find(search).populate('student');
        let Allinterview = await Interview.find({}).populate('student'); 
       let student = await Student.find(
            search
        ).populate({
            path: 'interview',
            populate: {
                path: 'document'
            },


        })

        

    
        res.render('interviewList.ejs', {
            Student: student,
            Interview: interview,
            Allinterview: Allinterview

        });


    } else {
//sending the unfiltered data to interviewList.ejs
        let interview = await Interview.find({}).populate('student');
        let Allinterview = await Interview.find({}).populate('student');

        let student = await Student.find(
            {}
        ).populate({
            path: 'interview',
            populate: {
                path: 'document'
            },


        })
        res.render('interviewList.ejs', {
            Student: student,
            Interview: interview,
            Allinterview: Allinterview
        });

    }


}
