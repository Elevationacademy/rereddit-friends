app.factory('userFactory', function($rootScope, $http) {

  var usersService = {

    addFriend: function(friend) {
      return $http.put('/users/' + $rootScope.userid + '/addfriends/' + friend._id, null)
        .then(function(response) {
          return response.data
        });
    },

    removeFriend: function(friend) {
      return $http.put('/users/' + $rootScope.userid + '/delfriends/' + friend._id, null)
        .then(function(response) {
          return response.data
        });
    },

    toggleAdmin: function(user) {
      return $http.put('/users/' + user._id + '/admin', null)
        .then(function(response) {
          return response.data
        });
    },

    isCurrentUser: function() {
      return $rootScope.userid === this.user._id ? true : false;
    }
  };

  return usersService;
});
