var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({secret: 'myLittleSecret'});

var User = require('../models/Users');

router.param('user', function(req, res, next, id) {
  console.log('here!')

  var query = User.findById(id);

  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }

    req.user = user;
    return next();
  });
});

router.get('/', auth, function(req, res, next) {
  User.find(function(err, users){
    if(err){ return next(err); }

    res.json(users);
  });
});

router.post('/:user/friends/:friend', auth, function (req, res, next) {
  User.findById(req.params.user, function (err, user) {
    if (err) { return err };

    User.findById(req.params.friend, function (err, friend) {
      if (err) { return err };

      friend.friends.push(user);
      friend.save();
      
      user.friends.push(friend);
      user.save(function(err, item) {
        res.json(item);
      });
    });
  });
});

router.get('/:user', function(req, res, next) {
  req.user.populate('friends', function(err, user) {
    if (err) { return next(err); }

    res.json(user);
  });
});

module.exports = router;
