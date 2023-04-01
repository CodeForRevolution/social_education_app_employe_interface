const Employe = require('../model/employe')
module.exports.create = async function (req, res) {
    console.log('enter into create function', req.body);

    if (req.body.password != req.body.confirmpassword) {
        res.redirect('/wrong');
    }
    let employe = await Employe.findOne({ email: req.body.email });
    if (employe) {
        console.log('user is exist');
        res.redirect('/wrong');
    }
    Employe.create(req.body);
    res.redirect('/')
}



module.exports.login = async function (req, res) {
    res.redirect('/home');

}