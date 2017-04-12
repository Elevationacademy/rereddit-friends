var express = require('express');
var router = express.Router()
var Post = require('../models/postModel');
var Comment = require('../models/commentModel');
var User = require('../models/userModel');


router.param('postid', function(req, res, next, id) {
  Post.findById(id, function(err, post) {
    if (err) {
      return next(err);
    } else if (!post) {
      return next(new Error('No post exists'));
    } else {
      req.post = post;
      return next();
    }
  });
});

router.param('commentid', function(req, res, next, id) {
  Comment.findById(id, function(err, comment) {
    if (err) {
      return next(err);
    } else if (!comment) {
      return next(new Error('No comment exists'));
    } else {
      req.comment = comment;
      return next();
    }
  });
});

router.get('/', function(req, res, next) {
  User.findById(req.user.userid, function(err, user) {
    if (err) {
      return next(err);
    }
    Post.find({ author: { $in: user.friends.concat(user._id) } })
      .populate('author', 'username').exec(function(err, posts) {
        if (err) {
          return next(err);
        }
        res.send(posts);
      });
  })
});

router.post('/', function(req, res, next) {
  var post = new Post(req.body);
  post.save(function(err, post) {
    if (err) {
      return next(err);
    }
    res.send(post);
  });
});

router.delete('/:postid', function(req, res, next) {
  if (req.user.isAdmin) {
    req.post.remove(function(err, response) {
      if (err) {
        return next(err);
      }
      res.send(response);
    });

  } else {
    res.status(401).send("Unauthorized")
  }
});

router.post('/:postid/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post._id;

  comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }
    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if (err) {
        return next(err);
      }
      res.send(comment);
    });
  });
});

router.get('/:postid', function(req, res, next) {
  req.post.populate({
    path: 'comments',
    populate: { path: 'author', select: 'username' }
  }, function(err, post) {
    if (err) {
      return next(err);
    }
    res.send(post);
  });
});

router.put('/:postid/upvote', function(req, res, next) {
  req.post.upvote();
  req.post.save(function(err, post) {
    if (err) {
      return next(err);
    }
    res.send(post);
  });
});

router.put('/:postid/downvote', function(req, res, next) {
  req.post.downvote();
  req.post.save(function(err, post) {
    if (err) {
      return next(err);
    }
    res.send(post);
  });
});

router.put('/:postid/comments/:commentid/upvote', function(req, res, next) {
  req.comment.upvote();
  req.comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }
    res.send(comment);
  });
});

router.delete('/:postid/comments/:commentid/', function(req, res, next) {

  if (req.user.isAdmin) {
    req.post.comments.pull(req.comment._id)
    req.comment.remove(function(err, response) {
      if (err) {
        return next(err);
      }
      res.send(response);
    });
  } else {
    res.status(401).send("Unauthorized")
  }

});

router.put('/:postid/comments/:commentid/downvote', function(req, res, next) {
  req.comment.downvote();
  req.comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }
    res.send(comment);
  });
});

module.exports = router;
