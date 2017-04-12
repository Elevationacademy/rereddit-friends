var express = require('express');
var router = express.Router();
var User = require('../models/userModel');
var passport = require('../models/passport');

router.post('/register', function(req, res, next) {
  var isAdmin = false
  if (req.body.username == "admin") {
    isAdmin = true
  }
  User.register(new User({ username: req.body.username, isAdmin: isAdmin }), req.body.password, function(err, user) {
    if (err) {
      return next(err);
    }
    req.login(user, { session: false }, function(err) {
      if (err) {
        return next(err);
      }
      return res.send({ token: user.generateJWT(), username: user.username, userid: user._id, isAdmin: user.isAdmin })
    });
  });
});

router.post('/login', passport.authenticate('local', { session: false }), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  return res.send({ token: req.user.generateJWT(), username: req.user.username, userid: req.user._id, isAdmin: req.user.isAdmin });
});


module.exports = router
