var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  text: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  upvotes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

PostSchema.methods.upvote = function() {
  this.upvotes++;
};

PostSchema.methods.downvote = function() {
  this.upvotes--;
};

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
