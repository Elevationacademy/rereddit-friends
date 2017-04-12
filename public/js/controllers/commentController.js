app.controller('CommentController', function(post, $rootScope, $scope, postFactory, auth) {

  var errorHandler = function(err) {
    console.error(err);
  };

  $scope.post = post.data;

  $scope.addComment = function() {
    if ($scope.body === '') {
      return;
    }
    postFactory.addComment($scope.post._id, {
        body: $scope.body,
        author: $rootScope.userid,
      }).then(function(comment) {
        comment.author = { username: $rootScope.username, _id: $rootScope.userid }
        $scope.post.comments.push(comment);
      })
      .catch(errorHandler);;

    $scope.body = '';
  };

  $scope.deleteComment = function() {
    var self = this;
    postFactory.deleteComment(this.post._id, this.comment._id)
      .then(function(res) {
        $scope.post.comments.splice($scope.post.comments.indexOf(self.comment), 1)
      })
      .catch(errorHandler);
  }

  $scope.upvote = function() {
    var self = this;
    postFactory.upvoteComment(this.post._id, this.comment._id)
      .then(function(post) {
        self.comment.upvotes++;
      })
      .catch(errorHandler);
  };

  $scope.downvote = function() {
    var self = this;

    postFactory.downvoteComment(this.post._id, this.comment._id)
      .then(function(post) {
        self.comment.upvotes--;
      })
      .catch(errorHandler);
  };

});
