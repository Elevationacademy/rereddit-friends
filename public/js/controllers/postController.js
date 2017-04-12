app.controller('PostController', function($rootScope, $scope, postFactory, posts) {


  var errorHandler = function(err) {
    console.error(err);
  }

  $scope.posts = posts.data;

  $scope.addPost = function() {
    if ($scope.text) {
      postFactory.create({
          text: $scope.text,
          author: $rootScope.userid,
        })
        .then(function(post) {
          post.author = { username: $rootScope.username, _id: $rootScope.userid }
          $scope.posts.push(post);
          $scope.text = '';
        })
        .catch(errorHandler);
    }
  }

  $scope.deletePost = function() {
    var self = this;
    postFactory.delete(this.post._id)
      .then(function(res) {
        $scope.posts.splice($scope.posts.indexOf(self.post), 1)
      })
      .catch(errorHandler);
  }

  $scope.upvote = function() {
    var self = this;
    postFactory.upvote(this.post._id)
      .then(function(post) {
        self.post.upvotes++;
      })
      .catch(errorHandler);
  }

  $scope.downvote = function() {
    var self = this;
    postFactory.downvote(this.post._id)
      .then(function(post) {
        self.post.upvotes--;
      })
      .catch(errorHandler);
  }

})
