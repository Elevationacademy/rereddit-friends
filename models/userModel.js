var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isAdmin: Boolean
});

UserSchema.plugin(require('passport-local-mongoose'));

UserSchema.methods.generateJWT = function() {
  return jwt.sign({
    userid: this._id,
    username: this.username,
    isAdmin: this.isAdmin
  }, 'myLittleSecret', { expiresIn: "7d" });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
