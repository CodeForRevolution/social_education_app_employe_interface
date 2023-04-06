const interview = require('../model/interview');
const Interview = require('../model/interview');
const Student=require('../model/student');



// module.exports.createForm = async function (req, res) {
//     res.render('interviewForm.ejs');
// }



module.exports.createInterview = async function (req, res) {
    console.log('you hit the create interview');


    let interview = await Interview.create(req.body);
    res.redirect('back')


}

module.exports.interviewList = async function (req, res) {

    





var search=new Object;
console.log(req.query);
if(req.query.name!=undefined&&req.query.name!=''){
    search.name=req.query.name;
}
if(req.query.position!=undefined&&req.query.position!=''){
    search.position=req.query.position;
}

console.log('your search is',search);

if(search.name!=undefined||search.position!=undefined){
console.log('come to render the sorted data');
let interview = await Interview.find(search).populate('student');
let Allinterview=await Interview.find({}).populate('student');

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
    Allinterview:Allinterview

});
  

}else{

  let   interview = await Interview.find({}).populate('student');
  let Allinterview=await Interview.find({}).populate('student');   

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
    Allinterview:Allinterview
});

}





   
}
