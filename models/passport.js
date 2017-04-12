var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./userModel');

passport.use(new LocalStrategy(User.authenticate()));

module.exports = passport;
