const interview = require('../model/interview');
const Interview = require('../model/interview');
const Student=require('../model/student');
module.exports.createForm = async function (req, res) {
    res.render('interviewForm.ejs');
}
module.exports.createInterview = async function (req, res) {
    console.log('you hit the create interview');


    let interview = await Interview.create(req.body);
    res.redirect('/home')


}

module.exports.interviewList = async function (req, res) {
    let interview = await Interview.find({}).populate('student');

    let student = await Student.find({}).populate({
        path: 'interview',
        populate: {
            path: 'document'
        },


    })
    res.render('interviewList.ejs', {
        Student: student,
        Interview: interview
    });
}
