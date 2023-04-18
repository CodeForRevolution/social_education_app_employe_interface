const passport = require('passport');
const Employee = require('../model/employe')
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy({
    usernameField: 'email',
    passReqToCallback:true
},
    async function (req,email, password, done) {
        try {
            let employe = await Employee.findOne({ email: email });
            if (employe && employe.password == password) {
                console.log('sending the employe to the authentication next ')
             req.flash('success','LOG-IN successfully')
                return done(null, employe);

            } else {
                console.log('user id or password is wrong');
                req.flash('error','Incorrect LOG-IN credentials')
                return done(null, false);
            }

        } catch (error) {
            console.log('error is find ', error);
            
        }

    }
));


passport.serializeUser(function (employe, done) {
    done(null, employe._id);
})
passport.deserializeUser(async function (id, done) {
    let employe = await Employee.findById(id);
    if (employe) {
        return done(null, employe);
    } else {
        return done(err);
    }
})

passport.checkAuthentication = function (req, res, next) {
    console.log('checking authentication');
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/');
    }

}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.employe = req.user;
    }
    next();
}

module.exports = passport;