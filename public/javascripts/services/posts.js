app.factory('posts', ['$http', 'auth', function($http, auth) {
  var postService = {
    posts: [],

    getAll: function() {
      return $http.get('/posts').then(function(data) {
  
        angular.copy(data.data, postService.posts);
      });
    },

    get: function(id) {
      return $http.get('/posts/' + id).then(function(res){
        return res.data;
      });
    },

    create: function(post) {
      return $http.post('/posts', post, {
        headers: {Authorization: 'Bearer '+ auth.getToken()}
      }).success(function(data){
        postService.posts.push(data);
      });
    },

    upvote: function(post) {
      return $http.put('/posts/' + post._id + '/upvote', null).success(function(data){
        post.upvotes += 1;
      });
    },

    addComment: function(id, comment) {
      return $http.post('/posts/' + id + '/comments', comment);
    },

    upvoteComment: function(post, comment) {
      return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null).success(function(data){
        comment.upvotes += 1;
      });
    }
  };
  

  return postService;
}]);