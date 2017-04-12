var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('./models/passport');
var ensureAuth = require('express-jwt')({ secret: 'myLittleSecret' });

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rereddit');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(passport.initialize());
app.use('/auth', require('./routes/authRoutes'));
app.use('/posts', ensureAuth, require('./routes/postsRoutes'));
app.use('/users', ensureAuth, require('./routes/usersRoutes'));

// catch all route for paths only - files will 404
app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// development error handler
// will print stacktrace - not for production usage
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});


app.listen('8000', function() {
  console.log("I'm here, you ready to play ball?");
});
