app.factory('postFactory', function($http, auth) {


  var httpHandler = function(response) {
    return response.data;
  }

  var postService = {

    create: function(post) {
      return $http.post('/posts', post)
        .then(httpHandler);
    },

    delete: function(postId) {
      return $http.delete('/posts/' + postId)
        .then(httpHandler);
    },

    deleteComment: function(postId, commentId) {
      return $http.delete('/posts/' + postId + '/comments/' + commentId)
        .then(httpHandler);
    },

    upvote: function(id) {
      return $http.put('/posts/' + id + '/upvote', null)
        .then(httpHandler);
    },

    downvote: function(id) {
      return $http.put('/posts/' + id + '/downvote', null)
        .then(httpHandler);
    },

    addComment: function(id, comment) {
      return $http.post('/posts/' + id + '/comments', comment)
        .then(httpHandler);
    },

    upvoteComment: function(postId, commentId) {
      return $http.put('/posts/' + postId + '/comments/' + commentId + '/upvote', null)
        .then(httpHandler);
    },

    downvoteComment: function(postId, commentId) {
      return $http.put('/posts/' + postId + '/comments/' + commentId + '/downvote', null)
        .then(httpHandler);
    }
  };

  return postService;
});
