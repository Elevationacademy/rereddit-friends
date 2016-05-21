app.controller('UserCtrl', ['$scope', 'auth', 'user', function($scope, auth, user) {
  $scope.user = user;
  $scope.friends = user.friends;
}]);