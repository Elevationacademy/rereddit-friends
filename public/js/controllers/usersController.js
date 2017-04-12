app.controller('UsersCtrl', function($rootScope, $scope, users, userFactory) {

  $scope.users = users.data;

  $scope.user = users.data.filter(function(user) {
    return user._id === $rootScope.userid;
  })[0]

  $scope.isCurrentUser = userFactory.isCurrentUser;

  $scope.isFriend = function() {
    for (var i = 0; i < $scope.user.friends.length; i++) {
      if (this.user._id === $scope.user.friends[i]) {
        return true
      }
    }
    return false;
  }

  $scope.addFriend = function() {
    userFactory.addFriend(this.user)
      .then(function(res) {
        $scope.user = angular.copy(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  $scope.removeFriend = function() {
    userFactory.removeFriend(this.user)
      .then(function(res) {
        $scope.user = angular.copy(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  $scope.toggleAdmin = function() {
    var self = this;
    userFactory.toggleAdmin(this.user)
      .catch(function(err) {
        self.user.isAdmin = !self.user.isAdmin
      });
  }



});
