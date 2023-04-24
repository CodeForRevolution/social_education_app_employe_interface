const { query } = require('express');
const interview = require('../model/interview');
const Interview = require('../model/interview');
const Student = require('../model/student');


module.exports.createInterview = async function (req, res) {


    try {

        let interview = await Interview.create(req.body);
        req.flash('success', 'interview is created');
        res.redirect('back')

    } catch (error) {
        console.log(error);
        res.redirect('back')
    }


}

module.exports.interviewList = async function (req, res) {
    //sending the data to the interviewLIist page 


    try {

        var interview = await Interview.find().populate('student');
        var Allinterview = await Interview.find({}).populate('student');
        let student = await Student.find(

        ).populate({
            path: 'interview',
            populate: {
                path: 'document'
            },


        })


        if (req.query.name != undefined && req.query.name != '') {

            var filter = interview.filter(function (a) {

                if (a.name.toLowerCase().includes(req.query.name.toLowerCase())) {  //filtering the student as per name
                    return a;
                }
            })
            interview = filter;

        }



        if (req.query.position != undefined && req.query.position != '') {

            var filter = interview.filter(function (a) {

                if (a.position.toLowerCase().includes(req.query.position.toLowerCase())) {  //filtering the interview as per name
                    return a;
                }
            })
            interview = filter;

        }


        if (req.query.date!=undefined && req.query.date!='') {

            var filter = interview.filter(function (a) {

                if (a.date.toString()==req.query.date.toString()) {  //filtering the interveiw as per position 
                    return a;
                }
            })
            console.log('you hit the date filter',req.query.date);
            interview = filter;

        }




console.log('you are rendering inteivew page',req.query)
        res.render('interviewList.ejs', {
            Student: student,
            Interview: interview,             //sending information to view page 
            Allinterview: Allinterview   

        });

    } catch (error) {

        console.log(error)
        req.flash('error', 'error in filtering the data')  //handle the error and sending response to the end user
        res.redirect('back')

    }



}
