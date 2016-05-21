app.controller('UsersCtrl', ['$scope', 'users', 'auth', function($scope, users, auth) {
  $scope.users = users.users;
  $scope.isCurrentUser = users.isCurrentUser;
  $scope.isFriend = users.isFriend;

  $scope.addFriend = function(friend) {
    users.addFriend(friend);
  }
}]);