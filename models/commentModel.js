var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  upvotes: { type: Number, default: 0 },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

CommentSchema.methods.upvote = function() {
  this.upvotes++;
};

CommentSchema.methods.downvote = function() {
  this.downvotes++;
};

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
