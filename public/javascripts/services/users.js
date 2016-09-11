app.factory('users', ['$http', 'auth', function($http, auth) {
  var usersService = {
    users: [],

    getAll: function() {
      return $http.get('/users', {
        headers: {Authorization: 'Bearer '+ auth.getToken()}
      }).then(function(data) {
  
        angular.copy(data.data, usersService.users);
      });
    },

    get: function(id) {
      return $http.get('/users/' + id).then(function(res){
        return res.data;
      });
    },

    isCurrentUser: function (user) {
      var current = auth.currentUser()._id;

      if (current === user._id) {
        return true;
      } else {
        return false;
      }
    },

    _findUserById: function (id) {
      for (var i = 0; i < usersService.users.length; i += 1) {
        if (usersService.users[i]._id === id) {
          return usersService.users[i]
        }
      }

      return {};
    },

    addFriend: function (friend) {
      return $http.post('/users/' + auth.currentUser()._id + /friends/ + friend._id, null, {
        headers: {Authorization: 'Bearer '+ auth.getToken()}
      }).then(function (data) {

        var currentId = auth.currentUser()._id;
        var currentUser = usersService._findUserById(currentId);

        angular.copy(data.data.friends, currentUser.friends);
      });
    },

    removeFriend: function (friend) {
      return $http.put('/users/' + auth.currentUser()._id + /removefriend/ + friend._id, null, {
        headers: {Authorization: 'Bearer '+ auth.getToken()}
      }).then(function (data) {

        var currentId = auth.currentUser()._id;
        var currentUser = usersService._findUserById(currentId);

        angular.copy(data.data.friends, currentUser.friends);
      });
    },

    isFriend: function (user) {
      var currentId = auth.currentUser()._id;

      var currentUser = usersService._findUserById(currentId);

      for (var i = 0; i < currentUser.friends.length; i += 1) {
        if (currentUser.friends[i] === user._id) {
          return true;
        }
      }

      return false;
    }
  };
  

  return usersService;
}]);