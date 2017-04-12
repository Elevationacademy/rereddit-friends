var express = require('express');
var router = express.Router();
var User = require('../models/userModel');

router.param('friend', function(req, res, next, id) {
  User.findById(id, function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error("Can't find friend"));
    } else {
      req.friend = user;
      return next();
    }
  });
});

router.param('user', function(req, res, next, id) {
  User.findById(id, function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error("Can't find user"));
    } else {
      req.user = user;
      return next();
    }
  });
});

router.get('/', function(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
});

router.put('/:user/admin', function(req, res, next) {
  req.user.isAdmin = !req.user.isAdmin
  req.user.save(function(err, user) {
    if (err) {
      return next(err);
    }
    res.send(user);
  });
});

router.put('/:user/addfriends/:friend', function(req, res, next) {
  req.friend.friends.push(req.user._id);
  req.friend.save(function(err, user) {
    if (err) {
      return next(err);
    }
    req.user.friends.push(req.friend._id);
    req.user.save(function(err, user) {
      if (err) {
        return next(err);
      }
      res.send(user);
    });
  });
});

router.put('/:user/delfriends/:friend', function(req, res, next) {
  req.friend.friends.pull(req.user._id);
  req.friend.save(function(err, user) {
    if (err) {
      return next(err);
    }
    req.user.friends.pull(req.friend._id);
    req.user.save(function(err, user) {
      if (err) {
        return next(err);
      }
      res.send(user);
    });
  });
});

router.get('/:user', function(req, res, next) {
  req.user.populate({
    path: 'friends',
    populate: {
      path: 'friends'
    }
  }, function(err, user) {
    if (err) {
      return next(err);
    }
    res.send(user);
  });

});

module.exports = router;
